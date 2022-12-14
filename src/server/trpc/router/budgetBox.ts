import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { PowerRanker } from '@/models/power'

export const budgetBoxRouter = router({
  insertOne: publicProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date().nullable(),
        creator: z.string(),
        title: z.string(),
        image: z.string(),
        description: z.string(),
        dampingFactor: z.number().min(0).max(1),
        maxVotesPerUser: z.number().min(1).nullable(),
        maxPairsPerVote: z.number().min(1).nullable(),
        allowlist: z.string().array(),
        spaceSlug: z.string().min(1),
        snapshotStrategies: z
          .object({
            name: z.string(),
            network: z.string(),
            params: z.any()
          })
          .array()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        startDate,
        endDate,
        creator,
        title,
        image,
        description,
        dampingFactor,
        maxVotesPerUser,
        maxPairsPerVote,
        spaceSlug,
        snapshotStrategies
      } = input
      try {
        const response = await ctx.prisma.budgetBox.create({
          data: {
            startDate,
            endDate,
            creator,
            title,
            image,
            description,
            dampingFactor,
            maxVotesPerUser,
            maxPairsPerVote,
            Strategies: {
              createMany: {
                data: snapshotStrategies.map(({ name, network, params }) => ({
                  name,
                  network,
                  params: params || ''
                }))
              }
            },
            Space: {
              connect: {
                slug: spaceSlug
              }
            }
          }
        })
        return response
      } catch (error) {
        console.error(error)
      }
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.budgetBox.findMany({
      include: {
        Strategies: true
      }
    })
  }),
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(({ ctx, input }) => {
      const { id } = input
      return ctx.prisma.budgetBox.findFirst({
        where: {
          id
        },
        include: {
          Strategies: true
        }
      })
    }),
  getManyBySpaceSlug: publicProcedure
    .input(
      z.object({
        slug: z.string()
      })
    )
    .query(({ ctx, input }) => {
      const { slug } = input
      return ctx.prisma.budgetBox.findMany({
        where: {
          Space: {
            slug
          }
        }
      })
    }),
  getRanking: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input
      const budgetBox = await ctx.prisma.budgetBox.findFirst({
        where: {
          id
        },
        select: {
          dampingFactor: true
        }
      })
      const projects = await ctx.prisma.project.findMany({
        where: {
          BudgetBoxes: {
            some: { id }
          }
        }
      })
      const votes = await ctx.prisma.preference.findMany({
        where: {
          Vote: {
            budgetBoxId: id
          }
        }
      })
      const projectSet: Set<string> = new Set()
      votes.map((vote) => {
        if (vote.preference !== 0) {
          projectSet.add(vote.alphaId)
          projectSet.add(vote.betaId)
        }
      })

      if (projectSet.size < 2) {
        return []
      }

      const powerRanker = new PowerRanker(projectSet, votes, projectSet.size)
      const rankings = powerRanker.run(budgetBox?.dampingFactor)
      const rankList = Object.fromEntries(rankings)

      return projects
        .map((project) => ({
          ...project,
          power: rankList[project?.id] || 0
        }))
        .sort((projectA, projectB) => projectB.power - projectA.power)
    })
})
