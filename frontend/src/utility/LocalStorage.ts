export default class LocalStorage {
  static addItem(key: String, value: String) {
    if (!localStorage.getItem(key.toString())) {
      localStorage.setItem(key.toString(), value.toString());
    } else localStorage.removeItem(key.toString());
  }

  static getItem(key: String): any {
    return JSON.parse(localStorage.getItem(key.toString()));
  }
}
