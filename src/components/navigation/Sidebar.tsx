import Link from 'next/link'
import { CreateIcon, HomeIcon } from '@/components/icons'
import type { ReactElement } from 'react'

interface IAppLayout {
  children: ReactElement
}

const sidebarItems = [
  {
    title: 'Home',
    alt: 'Home button',
    link: '/',
    icon: <HomeIcon height={18} width={18} />
  },
  {
    title: 'New Space',
    alt: 'New Space button',
    link: '/create',
    icon: <CreateIcon height={18} width={18} />
  }
]

export const Sidebar = ({ children }: IAppLayout) => {
  return (
    <div className="flex min-h-[calc(100vh_-_100px)]">
      <aside className="sticky top-[100px] hidden h-[calc(100vh_-_100px)] w-[180px] flex-col items-start justify-start gap-y-10 bg-blue-50 pl-6 pt-8 sm:flex">
        {sidebarItems.map((item) => (
          <Link key={item.title} className="flex items-center" href={'/'}>
            <div className="grid h-8 w-8 place-content-center rounded-full bg-gradient-to-b from-blue-500 to-cyan-300">
              {item.icon}
            </div>
            <h3 className="ml-2 text-gray-500">{item.title}</h3>
          </Link>
        ))}
      </aside>
      <main className="w-full">{children}</main>
    </div>
  )
}