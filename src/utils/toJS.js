export default function toJS(jsValue, jsPreprocessor) {
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
