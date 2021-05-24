export default class LocalData {
  static getCode () {
    return localStorage.getItem('vconsole-code') || 'console.log("Welcome to vconsole")';
  }

  static saveCode (data) {
    return localStorage.setItem('vconsole-code', data);
  }

  static getFontSize () {
    return localStorage.getItem('vconsole-font') || 16;
  }

  static setFontSize (val) {
    return localStorage.setItem('vconsole-font', val);
  }

  static getToken () {
    return localStorage.getItem('vconsole-token') || null;
  }
}