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

function addLibs (iframe) {
  let libs = localStorage.getItem('libraries');
  if (libs) {
    libs = JSON.parse(libs);
    for (let i = 0; i < libs.length; i++) {
      const url = libs[i];
      const doc = iframe.contentDocument;
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      doc.body.append(script);
    }
  }
}

function formatOutput (logMessages) {
  return logMessages.map(msg => concatArgs(msg)).join('\n');
}

function concatArgs (logMessages) {
  let splitArgs = false;
  return logMessages.map(msg => {
    if (msg) {
      if (msg.toString() === '[object Map]' || msg.toString() === '[object Set]') {
        let arr = [...msg];
        msg = msg.toString() + ` (${arr.length}) ` + JSON.stringify(arr, null, 2);
        splitArgs = true;
      }
      if (msg.toString() === '[object Object]') {
        msg = msg.toString() + ' ' + JSON.stringify(msg, null, 2);
      }
      if (Array.isArray(msg)) {
        msg = `Array (${msg.length}) ` + JSON.stringify(msg, null, 2);
        splitArgs = true;
      }
    }

    return (msg === undefined) ? 'undefined' : msg;
  })
    .join(splitArgs ? '\n' : ' ');
}

export default function runCode (jsScript) {
  const iframe = createIframe();
  addLibs(iframe);
  createScript(iframe, jsScript);
  
  // handle errors
  iframe.contentWindow.onerror = (message, file, line, col, error) => {
    window.parent.postMessage(`(${line}:${col}) -> ${error}`);
  };

  // get console outputs as string
  let messages = [];
  iframe.contentWindow.console.log = async (...args) => {
    messages.push.apply(messages, [args]);
    window.parent.postMessage(formatOutput(messages));
  };
}