export default function loadCDN(language) {
  const noCdn = ['javascript', 'html'];

  if (!language || noCdn.includes(language) || !language.cdn) return;

  let element = document.getElementById(language.name);
  if (element) return;

  const script = document.createElement('script');
  script.src = language.cdn;
  script.id = language.name;
  script.async = false;

  //document.head.prepend(script);

  const referenceNode = document.getElementById('root')
  if (referenceNode) referenceNode.parentNode.prepend(script);
}