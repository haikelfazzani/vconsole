import Languages from "./Languages";

export default function addOrRemoveElement(preprocess) {
  if (preprocess !== 'javascript') {
    let element = document.getElementById(preprocess)
    if (element) {
      element.parentElement.removeChild(element);
      return;
    } else {
      const language = Languages.find(lang => lang.name === preprocess);

      const script = document.createElement('script');
      script.src = language.cdn;
      script.id = language.name;

      const referenceNode = document.querySelector('.monaco-aria-container')

      if (referenceNode) referenceNode.parentNode.prepend(script);
    }
  }
}