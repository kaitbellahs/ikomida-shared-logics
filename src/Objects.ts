export default class Objects {
  static deepCopy(object: never) {
    return JSON.parse(JSON.stringify(object));
  }
}
