export default class Transpile {

  static addOrRemoveFromDom(preprocess) {
    if (preprocess !== 'javascript') {
      let element = document.getElementById(preprocess)
      if (element) {
        element.parentElement.removeChild(element);
      } else {
        const script = document.createElement('script')
        script.src = this.allPreps()[preprocess]
        script.id = preprocess
        document.body.appendChild(script)
      }
    }
  }

  static async toJs(jsValue, jsPreprocessor) {
    return new Promise((resolve) => {
      let res = ''

      switch (jsPreprocessor) {
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
          resolve(res)
          break;

        case 'coffeescript':
          res = window.CoffeeScript.compile(jsValue)
          resolve(res)
          break;

        case 'livescript':
          let req = window.require
          if (req) {
            const LiveScript = req("livescript");
            res = LiveScript.compile(jsValue)
            resolve(res)
          }
          break;

        case 'babel':
          let options = { envName: 'production', presets: ['es2017'], babelrc: false };
          res = window.Babel.transform(jsValue, options).code;
          resolve(res)
          break;

        default:
          resolve(jsValue)
          break;
      }
    });
  }

  static allPreps() {
    return {
      javascript: null,
      typescript: 'https://cdnjs.cloudflare.com/ajax/libs/typescript/4.6.2/typescript.min.js',
      coffeescript: 'https://cdn.jsdelivr.net/npm/coffeescript@2.5.1/lib/coffeescript-browser-compiler-legacy/coffeescript.min.js',
      livescript: 'http://livescript.net/livescript-1.6.0-min.js',
      babel: 'https://unpkg.com/@babel/standalone@7.13.14/babel.min.js'
    }
  }
}