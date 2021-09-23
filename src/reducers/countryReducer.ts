import Types from './actionTypes'
import {TCountry, TCountryState} from '../types'

const handlers: any = {
  [Types.SHOW_LOADER]: (state: TCountryState) => ({...state, loading: true}),

  [Types.ADD_COUNTRY]: (state: TCountryState, {payload}: {payload: any}) => ({
    ...state,
    countries: [...state.countries, payload],
  }),

  [Types.FETCH_COUNTRY]: (state: TCountryState, {payload}: {payload: TCountry[]}) => ({
    ...state,
    countries: payload,
    loading: false,
  }),

  [Types.REMOVE_COUNTRY]: (state: TCountryState, {payload}: {payload: any}) => ({
    ...state,
    loading: false,
    countries: state.countries.filter((country: TCountry): boolean => country.id !== payload.id),
  }),
  DEFAULT: (state: TCountryState) => state,
}

const reducer = (
  state: TCountryState,
  action: {type: Types, payload?: {}}
): TCountryState => (handlers[action.type] || handlers.DEFAULT)(state, action);

export default reducer

