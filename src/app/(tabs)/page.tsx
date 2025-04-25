'use client'
import ky from 'ky'
import type { BaseResponse, Movies } from '@/types'
import { useAtomValue } from 'jotai'
import { cityAtom } from '@/atoms'

async function getMovieList({
  type,
  cityId = 340104,
  pageNum,
  pageSize = 10,
}: {
  type: number
  cityId?: number
  pageNum: number
  pageSize?: number
}) {
  const city = useAtomValue(cityAtom)
  const url = `https://m.maizuo.com/gateway?cityId=${city.cityId}&pageNum=${pageNum}&pageSize=${pageSize}&type=${type}`
  const response = await ky
    .get(url, {
      headers: {
        'X-Host': 'mall.film-ticket.film.list',
      },
    })
    .json<BaseResponse<Movies>>()

  return response.data
}

export default function Page() {
  // const { city, isLoading, error } = useUserLocation()
  // const type = useAtomValue(movieTypeAtom)
  // const city = useAtomValue(cityAtom)

  // const { data, isPending } = useQuery({
  //   queryKey: ['movies', type, city.cityId],
  //   queryFn: () => {
  //     return getMovieList({
  //       type,
  //       pageNum: 1,
  //       cityId: city.cityId,
  //       pageSize: 10,
  //     })
  //   },
  // })

  // useEffect(() => {
  //   getMovieList({
  //     type,
  //     cityId: city.cityId,
  //     pageNum: 1,
  //     pageSize: 10,
  //   })
  // }, [type, city])

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }
  // if (error) {
  //   return <div>Error: {error.message}</div>
  // }

  // if (city) {
  //   return <div>{JSON.stringify(city)}</div>
  // }
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Welcome to the Tabs Page!</h1>
      <p className="text-gray-500">This is the default tab content.</p>
    </div>
  )
}
