import React from 'react'
import CountryForm from '../../components/CountryForm'
import {addCountry} from  '../../actions/country'
import {TCountry} from '../../types'
import {useHistory} from 'react-router'

const country: TCountry = {
  name: '',
  taxes: [{amount: 0, tax: 0}],
}

const AddPage: React.FC = (): JSX.Element => {
  const location = useHistory()

  const addHandler = (country: TCountry) => {
    addCountry(country)
      .then((country: TCountry) => location.push('/'))
  }

  return (
    <React.Fragment>
      <h1>Add New Country</h1>
      <CountryForm
        country={country}
        saveHandler={addHandler}
      />
    </React.Fragment>
  )
}

export default AddPage
