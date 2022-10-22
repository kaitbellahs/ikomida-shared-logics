import { Types } from '@ikomida/shared-types'

export default class Finances {
  static calcDiscount(price: number, value: number, type?: Types.TDiscount): number {
    let result = 0
    if (type && Types.TDiscount.PERCENT.equalTo(type)) {
      result = price * (value / 10000)
    } else if (type && Types.TDiscount.VALUE.equalTo(type)) {
      result = value < price ? value : price
    }
    result = Math.round(result)
    return isNaN(result) ? 0 : result
  }

  static pad(string: string | number, max: number): string {
    string = string.toString()
    return string.length < max ? Finances.pad('0' + string, max) : string
  }

  static random(min: number, max: number): number {
    return Math.ceil(Math.random() * (max - min + 1) + min)
  }

  static toNumber(string?: string | number): string | null {
    string = String(string)
    const matches = String(string).match(/\d+/g)
    if (matches) {
      return String(matches.join(''))
    }
    return null
  }

  static padRight(str: string, max: number): string {
    str = str.toString()
    return str.length < max ? Finances.padRight(str + '0', max) : str
  }

  static toFinanceNumber(string?: string | number): number | null {
    string = String(string)
    let matches = String(string).match(/[\d.,]+/g)
    if (matches) {
      string = matches.join('')
    }
    string = String(Math.ceil(Number(string) * 100))
    matches = String(string).match(/\d+/g)
    if (matches) {
      return Number((Math.ceil(parseInt(matches.join(''), 10) * 100) * 0.0001).toFixed(2))
    }
    return null
  }

  static formatMeasure(measure: number, type: Types.TMeasure): string {
    if (type === Types.TMeasure.GRAM) {
      if (measure < 900) {
        return `${measure} g`
      } else {
        return `${(measure / 1000).toFixed(1)} Kg`
      }
    } else if (type === Types.TMeasure.CENTIMETER) {
      if (measure < 100) {
        return `${measure} cm`
      } else {
        return `${(measure / 100).toFixed(1)} m`
      }
    } else if (type === Types.TMeasure.MILLILITER) {
      if (measure < 900) {
        return `${measure} ml`
      } else {
        return `${(measure / 1000).toFixed(1)} l`
      }
    } else {
      return `${measure} ?`
    }
  }
}
