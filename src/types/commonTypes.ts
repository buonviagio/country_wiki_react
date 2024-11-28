export type Country ={
  name: Name
  tld: string[]
  cca2: string
  ccn3: string
  cca3: string
  cioc: string
  independent: boolean
  status: string
  unMember: boolean
  currencies: Currencies
  idd: Idd
  capital: string[]
  altSpellings: string[]
  region: string
  subregion: string
  languages: Languages
  translations: {}
  latlng: number[]
  landlocked: boolean
  borders: string[]
  area: number
  demonyms: {}
  flag: string
  maps: Maps
  population: number
  gini: Gini
  fifa: string
  car: Car
  timezones: string[]
  continents: string[]
  flags: Flags
  coatOfArms: CoatOfArms
  startOfWeek: string
  capitalInfo: CapitalInfo
  postalCode: PostalCode
}

export type Name ={
  common: string
  official: string
  nativeName: NativeName
}

export type NativeName ={
  deu: Deu
}

export type Deu ={
  official: string
  common: string
}

export type Currencies ={
  EUR: Eur
}

export type Eur ={
  name: string
  symbol: string
}

export type Idd ={
  root: string
  suffixes: string[]
}

export type Languages ={
  deu: string
}



export type Maps ={
  googleMaps: string
  openStreetMaps: string
}

export type Gini ={
  "2016": number
}

export type Car ={
  signs: string[]
  side: string
}

export type Flags ={
  png: string
  svg: string
  alt: string
}

export type CoatOfArms ={
  png: string
  svg: string
}

export type CapitalInfo= {
  latlng: number[]
}

export type PostalCode ={
  format: string
  regex: string
}

export type UserType = {
  uid: string,
  email: string;
}
