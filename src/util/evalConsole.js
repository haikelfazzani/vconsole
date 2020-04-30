export default function evalConsole (editorValue) {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe');
    iframe.id = 'js-console-iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument;
    const script = doc.createElement('script');

    const blob = new Blob([editorValue], { type: 'application/javascript' });
    script.src = URL.createObjectURL(blob);

    doc.body.append(script);
    

    // handle errors
    iframe.contentWindow.onerror = (message, file, line, col, error) => {
      reject(`(${line}:${col}) -> ${error}`);
    };

    // get console outputs as string
    let logBackup = iframe.contentWindow.console.log;
    let logMessages = [];

    iframe.contentWindow.console.log = function () {
      logMessages.push.apply(logMessages, arguments);
      logBackup.apply(console, arguments);

      let b = logMessages.map(v => {
        if (v.toString() === '[object Map]' || v.toString() === '[object Set]') {
          let arr = [...v];
          v = v.toString() + ` (${arr.length}) ` + JSON.stringify(arr, null, 2)
        }
        if (v.toString() === '[object Object]') {
          v = v.toString() + ' ' + JSON.stringify(v, null, 2)
        }
        if (Array.isArray(v)) {
          v = `Array (${v.length}) ` + JSON.stringify(v, null, 2)
        }
        return v
      })

      resolve(b.join('\n\n'));
    };
  })
}