function toJS(jsValue, preprocessor) {
  let res = null;
  switch (preprocessor) {
    case 'typescript':
      res = window.ts.transpileModule(jsValue, {
        compilerOptions: {
          allowJs: true,
          declaration: true,
          emitDeclarationOnly: true,
          noEmitOnError: true,
          noImplicitAny: true,
          target: window.ts.ScriptTarget.ES5,
          module: window.ts.ModuleKind.CommonJS
        }
      }).outputText;
      return res;

    // case 'coffeescript':
    //   res = window.CoffeeScript.compile(jsValue)
    //   return res;

    case 'livescript':
      let req = window.require
      if (req) {
        const LiveScript = req("livescript");
        res = LiveScript.compile(jsValue)
      }
      return res;

    // case 'babel':
    //   let options = { envName: 'production', presets: ['es2017'], babelrc: false };
    //   res = window.Babel.transform(jsValue, options).code;
    //   return res;

    default:
      return jsValue
  }
}

function addLibs(iframe) {
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

function formatOutput(logMessages) {
  return logMessages.map(msg => concatArgs(msg)).join('\n');
}

function concatArgs(logMessages) {
  let splitArgs = false;
  return logMessages.map(msg => {
    if (msg) {
      if (typeof msg === 'string') {
        msg = '<span class="warning">"' + msg + '"</span> ';
      }

      if (typeof msg === 'number') {
        msg = '<span class="blue">' + msg + '</span> ';
      }

      if (Array.isArray(msg)) {
        msg = `<span class="green">Array (${msg.length})</span> ` + JSON.stringify(msg, null, 2);
        splitArgs = true;
      }

      if (typeof msg.toString === 'function') {
        if (msg.toString() === '[object Map]' || msg.toString() === '[object Set]') {
          let arr = [...msg];
          msg = msg.toString() + ` <span class="green">(${arr.length})</span> ` + JSON.stringify(arr, null, 2);
          splitArgs = true;
        }
        if (msg.toString() === '[object Object]') {
          msg = '<span class="green">' + msg.toString() + '</span> ' + JSON.stringify(msg, null, 2);
        }
      }
      else {
        msg = JSON.stringify(msg, null, 2);
      }
    }

    return (msg === undefined) ? 'undefined' : msg;
  })
    .join(splitArgs ? '\n' : ' ');
}

export default async function RunCode(code, language) {
  try {
    const iframe = document.querySelector('.sandbox');
    const iframeDoc = iframe.contentDocument;
    const iframeWin = iframe.contentWindow;
    iframeDoc.open();

    addLibs(iframe);

    const cdnScripts = language === 'coffeescript'
      ? `<script src="https://cdn.jsdelivr.net/npm/coffeescript@2.5.1/lib/coffeescript-browser-compiler-legacy/coffeescript.min.js"></script>`
      : '';

    iframeDoc.write(`<html><head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sandbox</title>
      </head><body>${cdnScripts}</body></html>`);

    let jsValue = toJS(code, language);
    iframeWin.onload = () => {
      // jsValue = iframeWin.CoffeeScript.compile(jsValue);
      // console.log(jsValue);
      const script = document.createElement('script');
      script.type = language === 'coffeescript' ? "text/javascript" : "module";
      script.text = jsValue;
      script.defer = true;

      iframeDoc.body.appendChild(script);
      //window.parent.postMessage(' ')

      // get console outputs as string
      let messages = [];
      iframeWin.console.log = async (...args) => {
        messages.push.apply(messages, [args]);
        console.log(messages);
        window.parent.postMessage(formatOutput(messages));
      };
    }

    iframeWin.onerror = function (message, _, lineno, colno) {
      const errors = jsValue.split('\n').map((line, i) => {
        return `${lineno - 1 === i ? '> ' : '  '} ${i + 1} | ${line.trim()}`
      });

      window.parent.postMessage(`${message} (${lineno}:${colno})\n\n${errors.join('\n')}`)
    };

    iframeDoc.close();
  } catch (error) {
    window.parent.postMessage(error.message);
  }
}

