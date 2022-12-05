import { Classes } from '@ikomida/shared-types'
import { DateTime as Luxon } from 'luxon'
import Finances from './Finances'

export default class DateTime {
  static today() {
    return Luxon.local().toFormat('yyyy-MM-dd')
  }

  static localToday() {
    return DateTime.localDate().toFormat('yyyy-MM-dd')
  }

  static now() {
    return Luxon.local().toFormat("yyyy-MM-dd'T'hh:mm:ss")
  }

  static parseAsaasDate(date?: string) {
    return new Date(DateTime.localDate(date).toString())
  }

  static localDate(date?: string): Luxon {
    return date ? Luxon.fromISO(date, { zone: 'America/Sao_Paulo' }) : Luxon.local().setZone('America/Sao_Paulo')
  }

  static isBusinessTime(object: Classes.CBusinessTime) {
    try {
      const dateTime = DateTime.localDate().toString()
      const nowDateTime = new Date(DateTime.localDate().toString())
      if ((object?.days ?? []).includes(nowDateTime.getDay()) && (object?.hours ?? []).length > 0) {
        const startDateTime = new Date(dateTime)
        const endDateTime = new Date(dateTime)
        for (const hours of object?.hours ?? []) {
          const start = [hours?.start?.substring(0, 2), hours?.start?.substring(2, 4)]
          const end = [hours?.end?.substring(0, 2), hours?.end?.substring(2, 4)]
          startDateTime.setHours(Number(start[0]))
          startDateTime.setMinutes(Number(start[1]))
          endDateTime.setHours(Number(end[0]))
          endDateTime.setMinutes(Number(end[1]))
          if (startDateTime <= nowDateTime && nowDateTime <= endDateTime) {
            return true
          }
        }
      }
    } catch (e) {
      //TODO: --report error
      console.error(e)
    }
    return false
  }
  static validateTime(timeString?: string) {
    if (timeString && timeString.length === 4 && !timeString?.includes(':')) {
      timeString = timeString.slice(0, 2) + ':' + timeString.slice(2)
    }
    const timeArray = timeString?.split(':') ?? []
    if ((timeArray?.length ?? 0) !== 2) {
      return false
    }
    if (
      Number(Finances.toNumber(timeArray?.[0])) < 0 ||
      Number(Finances.toNumber(timeArray?.[0])) > 23 ||
      Number(Finances.toNumber(timeArray?.[1])) > 59 ||
      Number(Finances.toNumber(timeArray?.[1])) < 0
    ) {
      return false
    }
    return true
  }
}
