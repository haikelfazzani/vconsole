export default class Transpile {

  static addOrRemoveFromDom (preprocess) {
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

  static async toJs (jsValue, jsPreprocessor) {
    return new Promise((resolve) => {
      if (jsPreprocessor === 'typescript' && window.ts) {
        let res = window.ts.transpileModule(jsValue, {
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
        resolve(res);
      }

      if (jsPreprocessor === 'babel' && window.Babel) {
        let options = { envName: 'production', presets: ['es2015'], babelrc: false };
        let res = window.Babel.transform(jsValue, options).code;
        resolve(res);
      }

      if (jsPreprocessor === 'coffeescript' && window.CoffeeScript) {
        let res = window.CoffeeScript.compile(jsValue)
        resolve(res);
      }

      else { resolve(jsValue); }
    });
  }

  static allPreps () {
    return {
      javascript: null,
      typescript: 'https://cdnjs.cloudflare.com/ajax/libs/typescript/4.4.0-beta/typescript.min.js',
      coffeescript: 'https://cdn.jsdelivr.net/npm/coffeescript@2.5.1/lib/coffeescript-browser-compiler-legacy/coffeescript.min.js',
      babel: 'https://unpkg.com/@babel/standalone@7.13.14/babel.min.js'
    }
  }
}