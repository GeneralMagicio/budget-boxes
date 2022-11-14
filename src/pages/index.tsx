import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { graphqlClient } from '@/graphql/clients/client'
import { GET_ALL_BUDGET_BOXES } from '@/graphql/queries/budgetBox'
import { BudgetBoxCard } from '@/components/cards/BudgetBoxCard'
import { BudgetBox } from '@/types/BudgetBox'

interface IHome {
  budgetBoxes: Array<BudgetBox>
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await graphqlClient.query({
      query: GET_ALL_BUDGET_BOXES,
      fetchPolicy: 'network-only'
    })
    const { budgetBoxes } = data

    return {
      props: {
        budgetBoxes
      }
    }
  } catch (e) {
    return {
      props: {
        budgetBoxes: []
      }
    }
  }
}

export default function Home({ budgetBoxes }: IHome) {
  return (
    <div>
      <Head>
        <title>Budget Boxes</title>
        <meta content="Generated by create next app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="h-screen px-14">
        <div className="mt-40 grid grid-cols-4 gap-y-8 justify-items-center ">
          {budgetBoxes.map((budgetBox: BudgetBox) => (
            <BudgetBoxCard key={budgetBox.id} budgetBox={budgetBox} />
          ))}
        </div>
      </main>
    </div>
  )
}
