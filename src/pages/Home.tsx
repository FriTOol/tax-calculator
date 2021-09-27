import React, {useEffect, useReducer, useState} from 'react'
import {Grid, TextField, makeStyles, Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import CountryList from '../components/CountryList'
import {fetchCountries, removeCountry} from '../actions/country'
import countryReducer from '../reducers/countryReducer'
import Types from '../reducers/actionTypes'
import {TCountry, TCountryState} from '../types'

const initialState: TCountryState = {
  loading: false,
  countries: [],
}

const useStyles = makeStyles({
  addButtonPanel: {
    marginBottom: '1em',
  }
})

const Home: React.FC = (): JSX.Element => {
  const [state, dispatch] = useReducer(countryReducer, initialState)
  const [salaryAmount, setSalaryAmount] = useState<number>(0)
  const classes = useStyles()

  useEffect(() => {
    dispatch({type: Types.SHOW_LOADER})
    fetchCountries()
      .then(countries => {dispatch({type: Types.FETCH_COUNTRY, payload: countries})})
  }, [])

  const deleteHandler = (country: TCountry): any => {
    dispatch({type: Types.SHOW_LOADER})
    removeCountry(country)
      .then(result => dispatch({type: Types.REMOVE_COUNTRY, payload: country}))
  }

  const onChangeSalaryValueHandler = (value: any): void => {
    value = parseInt(value)
    if (!value) {
      value = 0
    }
    setSalaryAmount(value)
  }

  return (
    <React.Fragment>
      <h1>Home</h1>
      <Grid container justifyContent={'space-between'} className={classes.addButtonPanel}>
        <Grid item>
          <TextField
            type="number"
            size="small"
            name="salary"
            label="Salary"
            variant="outlined"
            value={salaryAmount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeSalaryValueHandler(event.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/country/add"
          >Add
          </Button>
        </Grid>
      </Grid>

      { state.countries.length > 0 &&
        <CountryList
          countries={state.countries}
          deleteHandler={deleteHandler}
          salaryAmount={salaryAmount}
        />
      }
      { state.loading &&
        'Loading...'
      }
    </React.Fragment>
  )
}

export default Home
