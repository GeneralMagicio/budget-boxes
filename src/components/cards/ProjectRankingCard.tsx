import Image from 'next/image'
import Link from 'next/link'

interface IProjectRankingCard {
  description: string
  power: number
  title: string
  url?: string
  owner?: string
  image?: string
  rank: number
}

export const ProjectRankingCard = ({
  description,
  power,
  title,
  url,
  owner,
  image,
  rank
}: IProjectRankingCard) => {
  return (
    <Link href={url || ''} target={url ? '_blank' : '_self'}>
      <div className="flex w-full items-center justify-between rounded-lg bg-white p-6 shadow-sm transition duration-100 hover:bg-green-50">
        <p className="w-20 text-center text-2xl font-black text-blue-900">
          {`#${rank}`}
        </p>
        {image ? (
          <div className="relative h-[100px] w-[120px] overflow-hidden rounded-xl shadow">
            <Image
              fill
              alt={`${title} logo`}
              className="object-cover"
              sizes="33vh"
              src={image}
            />
          </div>
        ) : null}
        <div className="w-[220px]">
          <h3 className=" font-semibold">{title}</h3>
          <h4 className="text-sm font-medium text-gray-500">{owner}</h4>
        </div>
        <div className="w-[350px] line-clamp-4">
          <p>{description}</p>
        </div>
        <p className="w-24 text-center text-2xl font-black text-blue-900">{`${(
          (power || 0) * 100
        ).toFixed(2)}%`}</p>
      </div>
    </Link>
  )
}
