import { Types } from "@ikomida/shared-types";

export default class Finances {
  static calcDiscount(price: number, value: number, type: Types.TDiscount): number {
    let result = 0;
    if (type === Types.TDiscount.PERCENT) {
      result = price * (value / 10000);
    } else if (type === Types.TDiscount.VALUE) {
      result = value < price ? value : price;
    }
    result = Math.round(result);
    return isNaN(result) ? 0 : result;
  }

  static pad(string: string | number, max: number): string {
    string = string.toString();
    return string.length < max ? Finances.pad('0' + string, max) : string;
  }

  static random(min: number, max: number): number {
    return Math.ceil(Math.random() * (max - min + 1) + min);
  }

  static toNumber(string: string | number): number | null {
    string = String(string);
    const matches = String(string).match(/\d+/g);
    if (matches) {
      return Number(matches.join(''));
    }
    return null;
  }

  static padRight(str: string, max: number): string {
    str = str.toString();
    return str.length < max ? Finances.padRight(str + '0', max) : str;
  }

  static toFinanceNumber(string: string | number): number | null {
    string = String(string);
    let matches = String(string).match(/[\d.,]+/g);
    if (matches) {
      string = matches.join('');
    }
    string = String(Math.ceil(Number(string) * 100));
    matches = String(string).match(/\d+/g);
    if (matches) {
      return Number((Math.ceil(parseInt(matches.join(''), 10) * 100) * 0.0001).toFixed(2));
    }
    return null;
  }

  static formatWeight(weight: number): string {
    if (weight < 1000) {
      return `${weight} g`;
    } else {
      return `${(weight / 1000).toFixed(1)} Kg`;
    }
  }
}
