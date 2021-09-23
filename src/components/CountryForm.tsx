import React, {useState} from 'react'
import {TextField, Box, IconButton, Button} from '@material-ui/core'
import {Add as AddIcon, Delete as DeleteIcon} from '@material-ui/icons'
import {TCountry, TCountryFormProps, TTax} from '../types'
import {useHistory} from 'react-router'

const CountryForm: React.FC<TCountryFormProps> = (props) => {
  const [country, setCountry] = useState<TCountry>(props.country)
  const location = useHistory()

  const onClickAddHandler: React.MouseEventHandler = (event) => {
    const taxes: TTax[] = country.taxes
    taxes.push({amount: 0, tax: 0})
    setCountry({...country, taxes})
  }

  const onClickDeleteHandler = (key: number) => {
    const taxes: TTax[] = country.taxes
    taxes.splice(key, 1)
    setCountry({...country, taxes})
  }

  const onChangeCountryNameHandler: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCountry({...country, name: event.target.value})
  }

  const onChangeTaxValueHandler = (
    key: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const taxes: TTax[] = country.taxes
    taxes[key][event.target.name] = parseFloat(event.target.value)

    setCountry({...country, taxes})
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    country.taxes = country.taxes.sort((a, b) => a.amount - b.amount)
    props.saveHandler(country)
  }

  return (
    <form onSubmit={submitHandler}>
      <TextField
        label="Country"
        value={country.name}
        helperText=""
        variant="outlined"
        fullWidth
        onChange={onChangeCountryNameHandler}
      />
        <h2>
          Tax Props
          <small>
            <IconButton size="small" color="primary" onClick={onClickAddHandler}>
              <AddIcon />
            </IconButton>
          </small>
        </h2>
        {country.taxes.map((tax: TTax, key: number) =>
          <Box component="div" mb={2} key={key} alignContent={'center'}>
            <TextField
              name="amount"
              label="Amount"
              helperText=""
              variant="outlined"
              value={tax.amount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeTaxValueHandler(key, event)}
              style={{marginRight: '1em'}}
            />
            <TextField
              name="tax"
              label="Tax Value %"
              helperText=""
              variant="outlined"
              value={tax.tax}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeTaxValueHandler(key, event)}
            />
            { country.taxes.length > 1 &&
            <IconButton
              size="small"
              onClick={() => onClickDeleteHandler(key)}
            >
              <DeleteIcon />
            </IconButton>}
          </Box>
        )}
        <Box>
          <Button
            variant="contained"
            color="default"
            type="button"
            style={{marginRight: '1em'}}
            onClick={event => (location.push('/'))}
          >Back</Button>
          <Button variant="contained" color="primary" type="submit">Save</Button>
        </Box>
    </form>
  )
}

export default CountryForm
