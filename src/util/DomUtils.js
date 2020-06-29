export default class DomUtils {

  static removeElement (id = 'typescript-link') {
    let elem = document.getElementById(id);
    return elem ? elem.parentNode.removeChild(elem) : null;
  }

  static createScript (url, id = 'typescript-link') {
    const script = document.createElement('script');
    script.id = id;
    script.src = url;
    
    document.body.append(script);
  }
}