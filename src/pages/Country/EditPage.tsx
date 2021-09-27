import React, {useEffect, useReducer} from 'react'
import CountryForm from '../../components/CountryForm'
import countryReducer from '../../reducers/countryReducer'
import {fetchCountry, updateCountry} from '../../actions/country'
import Types from '../../reducers/actionTypes'
import {TCountry, TCountryState} from '../../types'
import {useHistory, useParams} from 'react-router'

const initialState: TCountryState = {
  loading: true,
  countries: [],
}

const EditPage: React.FC = (): JSX.Element => {
  const [state, dispatch] = useReducer(countryReducer, initialState)
  const location = useHistory()
  const { id } = useParams<{id: string}>()

  useEffect(() => {
    dispatch({type: Types.SHOW_LOADER})
    fetchCountry(id)
      .then(country => {dispatch({type: Types.FETCH_COUNTRY, payload: [country]})})
  }, [id])

  const saveHandler = (country: TCountry) => {
    updateCountry(country)
      .then((country: TCountry) => location.push('/'))
  }

  return (
    <React.Fragment>
      <h1>Edit Country</h1>
      { state.countries.length > 0 &&
        <CountryForm
          country={state.countries[0]}
          saveHandler={saveHandler}
        />
      }
      { state.loading &&
        'Loading'
      }
    </React.Fragment>
  )
}

export default EditPage
