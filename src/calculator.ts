import {TCountry, TTax} from './types'

const calculate = (country: TCountry, salary: number): number[] => {
  let pureSalary = 0
  let taxAmount = 0
  let taxPercent = 0
  if (salary > 0) {
    const taxes = country.taxes.sort((a, b) => a.amount - b.amount)

    // eslint-disable-next-line array-callback-return
    taxes.map((tax: TTax, index: number) => {
      let value = salary
      const isLast = index + 1 === taxes.length
      const min = tax.amount
      const max = isLast ? 0 : taxes[index + 1].amount

      if (salary < min) {
        // eslint-disable-next-line array-callback-return
        return
      }
      if (max > 0 && salary > max) {
          value = max - min
      } else {
        value = value - min
      }
      if (value === 0) {
        // eslint-disable-next-line array-callback-return
        return
      }
      // console.log(value, tax.tax)

      taxAmount += value * (tax.tax / 100)
    })

    pureSalary = salary - taxAmount
    taxPercent = taxAmount / salary * 100
  }

  return [pureSalary, taxAmount, taxPercent]
}

export default calculate
