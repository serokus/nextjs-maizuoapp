import ky from 'ky'
import type { BaseResponse, Cities } from '@/types'

export const getCityList = async () => {
  const response = await ky
    .get('https://m.maizuo.com/gateway')
    .json<BaseResponse<Cities>>()
  return response.data.cities
}
