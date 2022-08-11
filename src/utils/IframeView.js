let iframe = document.getElementById('sandbox');
let iframeDoc = iframe.contentDocument;
let iframeWin = iframe.contentWindow;

const broadcastChannel = new BroadcastChannel('sw-messages');

export default class IframeView {
  static formatOutput(logMessages) {
    return logMessages.map(msg => {
      if (msg) {
        if (typeof msg === 'string') msg = `"${msg}"`;
        if (typeof msg === 'number') msg = `<span class="blue">${msg}</span>`;

        if (Array.isArray(msg)) {
          msg = `<span class="green">Array (${msg.length})</span> ${JSON.stringify(msg, null, 2)}`;
        }

        if (typeof msg.toString === 'function') {
          if (msg.toString() === '[object Map]' || msg.toString() === '[object Set]') {
            let arr = [...msg];
            msg = `${msg.toString()} <span class="green">(${arr.length})</span> ${JSON.stringify(arr, null, 2)}`;
          }
          if (msg.toString() === '[object Object]') {
            msg = `<span class="green">${msg.toString()}</span> ${JSON.stringify(msg, null, 2)}`;
          }
        }
        else {
          msg = JSON.stringify(msg, null, 2);
        }
      }

      return (msg === undefined) ? 'undefined' : msg;
    })
      .join('\n');
  }

  static loadExternalLibs() {
    let libs = localStorage.getItem('libraries');
    if (libs) {
      libs = JSON.parse(libs);
      for (let i = 0; i < libs.length; i++) {
        const url = libs[i];
        const doc = iframeDoc;
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        doc.body.append(script);
      }
    }
  }

  static display(jsValue) {
    iframeDoc.open();
    iframeDoc.write(`<html><head><meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sandbox</title></head><body>
      <script id="cdn-js" data-name="javascript"></script></body></html>`);
    
    this.loadExternalLibs();

    try {
      iframeWin.onload = () => {
        const script = document.createElement('script');
        script.type = "module";
        script.text = jsValue;
        script.defer = true;

        iframeDoc.body.appendChild(script);

        script.onerror = function() {
          console.log("Error loading " + this.src);
        };

        let messages = [];
        iframeWin.console.log = async (...args) => {
          messages.push.apply(messages, [args]);
          broadcastChannel.postMessage({ source: 'iframe', result: messages.map(msg => this.formatOutput(msg)).join('\n\n') });
        };        
      }

      iframeWin.onerror = function (message, _, lineno, colno) {
        const errors = jsValue
          .split('\n')
          .map((line, i) => {
            return `${lineno - 1 === i ? '> ' : '  '} ${i + 1} | ${line.trim()}`
          })
          .slice(lineno > 0 ? lineno - 1 : 0, lineno + 1);

        broadcastChannel.postMessage({ source: 'iframe', error: `${message} (${lineno}:${colno})\n\n${errors.join('\n')}` })
      };

    } catch (e) {
      broadcastChannel.postMessage({ source: 'iframe', error: e.message })
    }

    iframeDoc.close();
  }
}