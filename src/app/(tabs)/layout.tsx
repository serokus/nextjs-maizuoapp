'use client'
import Link from 'next/link'
import { useAtom, useAtomValue } from 'jotai'
import { movieTypeAtom, tabItemsAtom } from '@/atoms'

export default function Layout({ children }: { children: React.ReactNode }) {
  const tabItems = useAtomValue(tabItemsAtom)
  const [movieType, setMovieType] = useAtom(movieTypeAtom)
  return (
    <>
      <nav className="grid grid-cols-2 justify-items-center items-center bg-background w-full h-12 border-b border-b-border box-border">
        {tabItems.map((tab) => {
          return (
            <Link
              href="#"
              key={tab.type}
              data-active={tab.type === movieType}
              onClick={(ev) => {
                ev.preventDefault()
                setMovieType(tab.type)
              }}
              className="text-foreground data-[active=true]:text-primary"
            >
              {tab.name}
            </Link>
          )
        })}
      </nav>
      <main className="w-full h-full min-h-svh">{children}</main>
    </>
  )
}
