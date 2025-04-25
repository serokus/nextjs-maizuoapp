import { atom } from 'jotai'
import { atomWithLazy, atomWithStorage } from 'jotai/utils'
import { cities } from '@/data/cities'
import type { City, Location } from '@/types'

export const tabItemsAtom = atom([
  { type: 1, name: '正在热映', href: '/popular' },
  { type: 2, name: '即将上映', href: '/discover' },
])

export const movieTypeAtom = atom(1)

export const userLocationAtom = atom<Location>()

export const isConfirmCityAtom = atom(false)

export const citiesAtom = atomWithLazy<City[]>(() => cities)

export const cityAtom = atomWithStorage<Partial<City>>('city', {})
