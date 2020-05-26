function removeElement (id) {
  let elem = document.getElementById(id);
  return elem ? elem.parentNode.removeChild(elem) : null;
}

function createIframe () {
  removeElement('js-console-iframe');
  const iframe = document.createElement('iframe');
  iframe.id = 'js-console-iframe';
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  return iframe;
}

function createScript (iframe, jsScript) {
  const doc = iframe.contentDocument;
  const script = doc.createElement('script');
  const blob = new Blob([jsScript], { type: 'application/javascript' });
  script.src = URL.createObjectURL(blob);
  doc.body.append(script);
}

export function evalConsole (jsScript) {

  const iframe = createIframe();
  createScript(iframe, jsScript);

  return new Promise((resolve, reject) => {
    // handle errors
    iframe.contentWindow.onerror = (message, file, line, col, error) => {
      reject(`(${line}:${col}) -> ${error}`);
    };

    // get console outputs as string
    let logMessages = [];

    iframe.contentWindow.console.log = function () {
      logMessages.push.apply(logMessages, arguments);
      resolve(logMessages);
    };
  });
}

export function formatOutput (logMessages) {
  return logMessages.map(msg => {

    if (msg) {
      if (msg.toString() === '[object Map]' || msg.toString() === '[object Set]') {
        let arr = [...msg];
        msg = msg.toString() + ` (${arr.length}) ` + JSON.stringify(arr, null, 2);
      }
      if (msg.toString() === '[object Object]') {
        msg = msg.toString() + ' ' + JSON.stringify(msg, null, 2);
      }
      if (Array.isArray(msg)) {
        msg = `Array (${msg.length}) ` + JSON.stringify(msg, null, 2);
      }
    }

    return (msg === undefined) ? 'undefined' : msg;
  })
    .join('\n');
}