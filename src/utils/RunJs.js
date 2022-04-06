import Languages from "./Languages";
let iframe = document.getElementById('sandbox');
let iframeDoc = iframe.contentDocument;
let iframeWin = iframe.contentWindow;

export default class RunJs {
  static compile(code, languageName) {
    let res = null;
    switch (languageName) {
      case 'typescript':
        res = iframeWin.ts.transpileModule(code, {
          compilerOptions: {
            allowJs: true,
            declaration: true,
            emitDeclarationOnly: true,
            noEmitOnError: true,
            noImplicitAny: true,
            target: iframeWin.ts.ScriptTarget.ES5,
            module: iframeWin.ts.ModuleKind.CommonJS
          }
        }).outputText;
        return res;

      case 'coffeescript':
        res = iframeWin.CoffeeScript.compile(code);
        return res;

      case 'livescript':
        let req = iframeWin.require
        if (req) {
          const LiveScript = req("livescript");
          res = LiveScript.compile(code)
        }
        return res;

      case 'babel':
        let options = { envName: 'production', presets: ['env'], targets: ">0.25%", babelrc: false };
        res = iframeWin.Babel.transform(code, options).code;
        return res;

      default:
        return code
    }
  }

  static loadCDN(languageName) {
    const language = Languages.find(lang => lang.name === languageName);
    if (!language.cdn) return;

    let script = iframeDoc.getElementById('cdn-js');
    if (script.dataset.name === languageName) return;

    script.src = language.cdn;
    script.dataset.name = languageName;
    script.async = false;
  }

  static run(code, languageName) {
    iframeDoc.open();
    iframeDoc.write(`<html><head><meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sandbox</title></head><body>
      <script id="cdn-js" data-name="javascript"></script></body></html>`);

    this.loadCDN(languageName);

    try {
      let jsValue = this.compile(code, languageName);

      iframeWin.onload = () => {
        const script = document.createElement('script');
        script.type = "module";
        script.text = jsValue;
        script.defer = true;

        iframeDoc.body.appendChild(script);

        let messages = [];
        iframeWin.console.log = async (...args) => {
          messages.push.apply(messages, [args]);
          window.parent.postMessage(messages.join('\n'));
        };
      }

      iframeWin.onerror = function (message, _, lineno, colno) {
        const errors = jsValue
          .split('\n')
          .map((line, i) => {
            return `${lineno - 1 === i ? '> ' : '  '} ${i + 1} | ${line.trim()}`
          })
          .slice(lineno > 0 ? lineno - 1 : 0, lineno + 1);

        window.parent.postMessage(`${message} (${lineno}:${colno})\n\n${errors.join('\n')}`)
      };
    } catch (error) {
      iframe.contentWindow.parent.postMessage(error)
    }

    iframeDoc.close();
  }
}