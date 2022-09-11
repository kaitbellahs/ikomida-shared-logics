export default class Objects {
  static deepCopy(object?: any) {
    if (object) {
      return JSON.parse(JSON.stringify(object));
    } else {
      object
    }
  }
}
