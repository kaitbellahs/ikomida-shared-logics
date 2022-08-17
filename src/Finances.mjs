import * as Types from '@ikomida/shared-types';
export default class Finances {
    static calcDiscount(price, value, type) {
        let result = 0
        if (Types.DiscountTypes[type] === Types.DiscountTypes.PERCENT) {
            result = price * (value / 10000)
        } else if (Types.DiscountTypes[type] === Types.DiscountTypes.VALUE) {
            result = value < price ? price - value : price
        }
        result = Math.round(result)
        return isNaN(result) ? 0 : result
    }

    static pad(string, max) {
        string = string.toString()
        return string.length < max ? pad("0" + string, max) : string
    }

    static Random(min, max) {
        return Math.ceil(Math.random() * (max - min + 1) + min)
    }

    static toNumber(string) {
        string = String(string)
        let matches = String(string).match(/\d+/g)
        if (matches) {
            return matches.join("")
        }
        return null
    }

    static padRight(str, max) {
        str = str.toString()
        return str.length < max ? Finances.padRight(str + "0", max) : str
    }

    static toFinanceNumber(string) {
        string = String(string)
        let matches = String(string).match(/[\d.,]+/g)
        if (matches) {
            string = matches.join("")
        }
        let indexOfPoint = string.indexOf('.')
        if (indexOfPoint < 0) {
            string = string.replace(",", ".")
        }
        indexOfPoint = string.indexOf('.')
        if (indexOfPoint < 0) {
            string += '.00'
        } else {
            const length = string.substring(indexOfPoint, string.length).length
            string = Finances.padRight(string, string.length + (3 - length))
        }
        matches = String(string).match(/\d+/g)
        if (matches) {
            return (Math.ceil(parseInt(matches.join(""), 10) * 0.01)).toFixed(2)
        }
        return null
    }

    static formatWeight(weight) {
        weight /= 100
        if (weight < 1000) {
            return `${weight}g`
        } else {
            return `${(weight / 1000).toFixed(1)} kg`
        }
    }
}