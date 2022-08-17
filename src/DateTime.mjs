import { DateTime as Luxon } from 'luxon'
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

    static parseAsaasDate(date) {
        return new Date(DateTime.localDate(date))
    }

    static localDate(date) {
        return date ? Luxon.fromISO(date, { zone: "America/Sao_Paulo" }) : Luxon.local().setZone("America/Sao_Paulo")
    }

    static isBusinessTime(object) {
        try {
            const dateTime = new Date(DateTime.localDate())
            if ((object?.days ?? []).includes(dateTime.getDay()) && (object?.hours ?? []).length > 0) {
                const startDateTime = dateTime
                const endDateTime = dateTime
                for (const hours of object?.hours ?? []) {
                    const start = [hours?.start?.substring(0, 2), hours?.start?.substring(2, 4)];
                    const end = [hours?.end?.substring(0, 2), hours?.end?.substring(2, 4)];
                    startDateTime.setHours(start[0])
                    startDateTime.setMinutes(start[1])
                    endDateTime.setHours(end[0])
                    endDateTime.setMinutes(end[1])
                    if (startDateTime <= dateTime && dateTime <= endDateTime) {
                        return true;
                    }
                }
            }
        } catch (e) {
            //TODO: --report error
            console.error(e)
        }
        return false;
    }
}