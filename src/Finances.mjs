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
        return string.length < max ? Finances.pad("0" + string, max) : string
    }

    static random(min, max) {
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
        string = String(Math.ceil(Number(string)))
        matches = String(string).match(/\d+/g)
        if (matches) {
            return (Math.ceil(parseInt(matches.join(""), 10) * 0.01)).toFixed(2)
        }
        return null
    }

    static formatWeight(weight) {
        if (weight < 1000) {
            return `${weight} g`
        } else {
            return `${(weight / 1000).toFixed(1)} Kg`
        }
    }
}