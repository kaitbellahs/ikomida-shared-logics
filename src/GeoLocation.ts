import { Classes } from '@ikomida/shared-types'

export default class GeoLocation {
    static distanceBetweenTwoLocations(startLocation: Classes.CLocation, endLocation: Classes.CLocation) {
        const earthRadius = 6371e3
        const degreeLatitude = GeoLocation.degreeToradian(Number(endLocation.latitude) - Number(startLocation.latitude))
        const degreeLongitude = GeoLocation.degreeToradian(Number(endLocation.longitude) - Number(startLocation.longitude))
        const squareHalfChord =
            Math.sin(degreeLatitude / 2) * Math.sin(degreeLatitude / 2) +
            Math.cos(GeoLocation.degreeToradian(Number(startLocation.latitude))) *
            Math.cos(GeoLocation.degreeToradian(Number(endLocation.latitude))) *
            Math.sin(degreeLongitude / 2) *
            Math.sin(degreeLongitude / 2)
        const radiansAngularDistance = 2 * Math.atan2(Math.sqrt(squareHalfChord), Math.sqrt(1 - squareHalfChord))
        const distance = earthRadius * radiansAngularDistance
        return distance
    }

    static degreeToradian(degree: number) {
        return degree * (Math.PI / 180)
    }
}
