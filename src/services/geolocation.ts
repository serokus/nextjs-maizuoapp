import ky from 'ky'
import type { RegeoResponse, Location } from '@/types'

export const getRegeoLocation = async (location: string) => {
  const response = await ky
    .get(`https://restapi.amap.com/v3/geocode/regeo`, {
      searchParams: {
        key: process.env.NEXT_PUBLIC_AMAP_KEY!,
        location,
        extensions: 'base',
      },
    })
    .json<RegeoResponse>()

  return response
}
