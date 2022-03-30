export default function addCDNToDOM(language) {
  const noCdn = ['javascript', 'html'];

  if (!language || noCdn.includes(language) || !language.cdn) return;

  let element = document.getElementById(language.name);
  if(element) return;

  const script = document.createElement('script');
  script.src = language.cdn;
  script.id = language.name;

  const referenceNode = document.querySelector('.monaco-aria-container')

  if (referenceNode) referenceNode.parentNode.prepend(script);
}