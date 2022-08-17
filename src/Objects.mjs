export default class Objects {
    static deepCopy(object) {
        return JSON.parse(JSON.stringify(object))
    }
}