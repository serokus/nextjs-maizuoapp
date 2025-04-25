export interface BaseResponse<T> {
  status: number
  data: T
  msg: string
}

export interface Actor {
  name: string
  role: string
  avatarAddress: string
}

export interface Movie {
  name: string
  filmId: number
  poster: string
  actors: Actor[]
  director: string
  category: string
  synopsis: string
  filmType: {
    name: string
    value: number
  }
  nation: string
  language: string
  videoId: string
  premiereAt: number
  timeType: number
  runtime: number
  grade: string
  item: {
    name: string
    type: number
  }
  isPresale: boolean
  isSale: boolean
}

export interface Movies {
  films: Movie[]
  total: number
}

export interface City {
  cityId: number
  name: string
  pinyin: string
  isHot: number
}

export interface Cities {
  cities: City[]
  total: number
}

export interface Location {
  lat: number
  lng: number
}

export interface RegeoResponse {
  status: string
  regeocode: {
    addressComponent: {
      city: string
      adcode: string
    }
  }
}
