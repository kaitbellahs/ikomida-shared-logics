import { Classes } from '@ikomida/shared-types';
import Finances from './Finances';
import { version as uuidVersion, validate as uuidValidate } from 'uuid';

export default class Validations {
  static validateCPF(cpf?: string) {
    let sum = 0;
    let rest;
    if (
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    )
      return false;

    for (let i = 1; i <= 9; i++) sum = sum + Number(Finances.toNumber(cpf?.substring(i - 1, i) ?? '') ?? 0) * (11 - i);
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != Number(Finances.toNumber(cpf?.substring(9, 10) ?? ''))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + Number(Finances.toNumber(cpf?.substring(i - 1, i) ?? '') ?? 0) * (12 - i);
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != Number(Finances.toNumber(cpf?.substring(10, 11) ?? ''))) return false;
    return true;
  }
  static validateCNPJ(cnpj?: string) {
    cnpj = cnpj?.replace(/[^\d]+/g, '');
    if (cnpj == '') return false;
    if (cnpj?.length != 14) return false;
    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    )
      return false;
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let position = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += Number(numbers.charAt(size - i)) * position--;
      if (position < 2) position = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != Number(digits.charAt(0))) return false;

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    position = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += Number(numbers.charAt(size - i)) * position--;
      if (position < 2) position = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != Number(digits.charAt(1))) return false;

    return true;
  }

  static validateAddress(object?: Classes.CAddress) {
    if (!Validations.validateCEP(object?.postalCode)) {
      return [false, 'CEP incorreto'];
    } else if ((object?.street?.length ?? 0) < 3 || (object?.street?.length ?? 0) > 255) {
      return [false, 'Nome incorreto'];
    } else if ((object?.neighborhood?.length ?? 0) < 2 || (object?.neighborhood?.length ?? 0) > 255) {
      return [false, 'Bairro incorreto'];
    } else if ((object?.city?.length ?? 0) < 2 || (object?.city?.length ?? 0) > 255) {
      return [false, 'Bairro incorreto'];
    } else if ((object?.stat?.length ?? 0) != 2) {
      return [false, 'Bairro incorreto'];
    }
    return [true, null];
  }
  static validateEmail(email?: string) {
    return email && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());
  }
  static validatePassword(password?: string) {
    return password && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,40}$/.test(password);
  }
  static validatePhone(phone?: string | number) {
    return phone && Finances.toNumber(phone)?.length === 11;
  }
  static validateUUID(uuid?: string) {
    return uuid && uuidValidate(uuid) && uuidVersion(uuid) === 4;
  }
  static validateCEP(cep?: string | number | null) {
    return cep && Finances.toNumber(cep)?.length === 8;
  }
  static validateDate(string?: string) {
    if (!string) {
      return false
    }
    const date = new Date(string);
    return date instanceof Date && !isNaN(Number(date));
  }
}
