import Languages from "./Languages";

export default class Transpile {

  static addOrRemoveFromDom(preprocess) {
    if (preprocess !== 'javascript') {
      let element = document.getElementById(preprocess)
      if (element) {
        element.parentElement.removeChild(element);
        return;
      } else {
        const language = Languages.find(lang => lang.name === preprocess);

        const script = document.createElement('script');
        script.src = language.cdn;
        script.id = language.name;

        const referenceNode = document.querySelector('.monaco-aria-container')

        if (referenceNode) referenceNode.parentNode.prepend(script);
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
}