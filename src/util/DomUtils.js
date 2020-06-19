export default class DomUtils {

  static removeElement (id = 'typescript-link') {
    let elem = document.getElementById(id);
    return elem ? elem.parentNode.removeChild(elem) : null;
  }

  static createScript (url) {
    const script = document.createElement('script');
    script.id = 'typescript-link';
    script.src = url;
    document.body.append(script);
  }
}