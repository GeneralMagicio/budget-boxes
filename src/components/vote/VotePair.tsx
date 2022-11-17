import { FC } from 'react'
import { VoteCard } from '@/components/cards/VoteCard'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { Project } from '@/types/project'

interface IVotePair {
  alpha: Project
  beta: Project
  selected: string
  handleVote: (newVote: string) => void
}

export const VotePair: FC<IVotePair> = ({
  alpha,
  beta,
  selected,
  handleVote
}) => {
  return (
    <div className="flex w-full max-w-[1000px] cursor-pointer flex-col items-center justify-between gap-y-4 px-4 lg:flex-row lg:px-10">
      <div onClick={() => handleVote('alpha')}>
        <VoteCard isSelected={selected === 'alpha'}>
          <ProjectCard
            description={alpha.description}
            id={alpha.id}
            image={alpha.image}
            owner={alpha.owner}
            title={alpha.title}
            url={alpha.url}
          />
        </VoteCard>
      </div>
      <div onClick={() => handleVote('beta')}>
        <VoteCard isSelected={selected === 'beta'}>
          <ProjectCard
            description={beta.description}
            id={beta.id}
            image={beta.image}
            owner={beta.owner}
            title={beta.title}
            url={beta.url}
          />
        </VoteCard>
      </div>
    </div>
  )
}
