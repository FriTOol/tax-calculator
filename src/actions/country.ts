import axios, {AxiosResponse} from 'axios'
import {TCountry} from '../types'

const BASE_URL = `${process.env.REACT_APP_DB_URL}/countries`

export const fetchCountries = async () => {
  const res = await axios.get(`${BASE_URL}.json`)
  let countries = []

  if (res.data) {
    countries = Object.keys(res.data).map(key => {
      return {
        ...res.data[key],
        id: key
      }
    })
  }

  return countries
}

export const fetchCountry = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/${id}.json`)

  if (res.data) {
    return {...res.data, id}
    // const country: TCountry = res.data
    // country.id = id
    //
    // return country
  }

  throw new Error(`Not found country by "${id}" ID`)
}

export const removeCountry = async (country: TCountry) => (
  await axios.delete(`${BASE_URL}/${country.id}.json`)
)

export const addCountry = async (country: TCountry) => (
  axios.post(`${BASE_URL}.json`, country)
    .then((response: AxiosResponse) => response.data.name)
)

export const updateCountry = async (country: TCountry) => (
  axios.put(`${BASE_URL}/${country.id}.json`, country)
    .then((response: AxiosResponse) => response.data)
)


