'use client'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { citiesAtom, cityAtom, userLocationAtom } from '@/atoms'
import { getRegeoLocation } from '@/services/geolocation'

const formatCity = (city: string) => {
  return city.endsWith('市') ? city.replace(/市$/, '') : city
}

export function useUserLocation() {
  const isClient = typeof window !== 'undefined'
  const cities = useAtomValue(citiesAtom)
  const [location, setLocation] = useAtom(userLocationAtom)

  const [city, setCity] = useAtom(cityAtom)

  // const cityQuery = useQuery({
  //   queryKey: ['city'],
  //   queryFn: async () => {},
  // })

  const geoQuery = useQuery({
    queryKey: ['geolocation'],
    queryFn: async () => {
      if (!isClient || !navigator.geolocation) {
        throw new Error('Geolocation not supported')
      }

      return new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error),
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 1000 * 60 * 5, // 5分钟缓存
          }
        )
      })
    },
    enabled: isClient && !location && !city,
    staleTime: Infinity,
    retry: 1,
  })

  // 逆地理编码查询
  const regeoQuery = useQuery({
    queryKey: ['regeolocation', location?.lng, location?.lat],
    queryFn: async () => {
      if (!location) {
        throw new Error('No coordinates')
      }

      const response = await getRegeoLocation(`${location.lng},${location.lat}`)
      const { status, regeocode } = response

      if (status !== '1') {
        throw new Error('Reverse geocoding failed')
      }

      return response.regeocode
    },
    enabled: !!location,
    staleTime: 1000 * 60 * 30, // 30分钟缓存
    retry: 2,
  })

  // 处理定位成功
  useEffect(() => {
    if (geoQuery.data) {
      const { latitude: lat, longitude: lng } = geoQuery.data.coords
      setLocation({ lat, lng })
    }
  }, [geoQuery.data, setLocation])

  // 处理逆地理编码结果
  useEffect(() => {
    if (regeoQuery.data) {
      const cityName = formatCity(regeoQuery.data.addressComponent.city)
      const city = cities.find((item) => item.name === cityName)
      if (city) {
        setCity(city)
      }
    }
  }, [regeoQuery.data, cities, setCity])

  return {
    city,
    location,
    isLoading: geoQuery.isLoading || regeoQuery.isLoading,
    error: geoQuery.error || regeoQuery.error,
  }
}
