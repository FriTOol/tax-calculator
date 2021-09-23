import {PropsWithChildren} from 'react'

export type TTax = {
  [amount: string]: number
  [tax: string]: number
}

export type TCountry = {
  id?: string
  name: string
  taxes: TTax[]
}

export type TCountryState = {
  loading: boolean
  countries: TCountry[]
}

export type TCountryListProps = {
  countries: TCountry[]
  deleteHandler:(country: TCountry) => any
  salaryAmount: number
}

export type TCountryFormProps = PropsWithChildren & {
  country: TCountry
  saveHandler(country: TCountry): void
}
