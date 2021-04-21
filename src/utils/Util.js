const jsBeautyOptions = {
  'indent_size': 2,
  'jslint_happy': false,
  'brace_style': 'preserve-inline',
  'break_chained_methods': true
};

export default class Util {

  static pretty (data) {
    if (window.js_beautify) { return window.js_beautify(data, jsBeautyOptions); }
  }

  static copy (data) {
    const el = document.createElement('textarea');
    el.value = data;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  static download (data, filename) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}