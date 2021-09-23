import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button, TableFooter
} from '@material-ui/core'
import {TCountryListProps} from '../types'
import calculate from '../calculator'
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  editButton: {
    marginRight: '1em',
  }
})

function CountryList(prop: TCountryListProps): JSX.Element {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Pure Salary</TableCell>
            <TableCell>Tax Amount</TableCell>
            <TableCell>Tax Percent</TableCell>
            <TableCell align="right">&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prop.countries.map((row) => {
            const [pureSalary, taxAmount, taxPercent] = calculate(row, prop.salaryAmount)

            return <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell component="th" scope="row">{pureSalary.toFixed(2)}</TableCell>
              <TableCell component="th" scope="row">{taxAmount.toFixed(2)}</TableCell>
              <TableCell component="th" scope="row">{taxPercent.toFixed(2)}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/country/edit/${row.id}`}
                  className={classes.editButton}
                >Edit</Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={event => window.confirm('Are sure?') ? prop.deleteHandler(row) : ''}
                >Delete</Button>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              Count: {prop.countries.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default CountryList
