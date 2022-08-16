importScripts('https://cdnjs.cloudflare.com/ajax/libs/typescript/4.7.2/typescript.min.js');
importScripts('https://unpkg.com/@babel/standalone@7.17.0/babel.min.js');
importScripts('https://cdn.jsdelivr.net/npm/coffeescript@2.7.0/lib/coffeescript-browser-compiler-legacy/coffeescript.min.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/livescript/1.6.1/livescript-min.min.js');

let broadcastChannel = null;

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting())
  //self.skipWaiting()
  console.log('compiler service worker is installed');
});

self.addEventListener('activate', () => {
  broadcastChannel = new BroadcastChannel('compiler-service-worker');
  broadcastChannel.postMessage({ source: 'service-worker', msg: 'Service worker: compiler is activated' });
  broadcastChannel.addEventListener('message', onMessageFromClient);
});

async function onMessageFromClient(event) {
  const { source, languageName, data } = event.data;

  if (source === 'client') {
    try {
      const result = await transpile(data, languageName);
      if (result) broadcastChannel.postMessage({ source: 'service-worker', result });
    } catch (error) {
      broadcastChannel.postMessage({ source: 'service-worker', error: error.message });
    }
  }
}

async function transpile(code, languageName) {
  return new Promise((resolve, reject) => {
    if (languageName === 'typescript') {
      const result = ts.transpileModule(code, {
        compilerOptions: {
          allowJs: true,
          declaration: true,
          emitDeclarationOnly: true,
          noEmitOnError: true,
          noImplicitAny: true,
          target: ts.ScriptTarget.ES5,
          module: ts.ModuleKind.CommonJS
        }
      }).outputText;
      resolve(result)
    }

    if (languageName === 'coffeescript') {
      const result = CoffeeScript.compile(code);
      resolve(result)
    }

    if (languageName === 'livescript') {
      if (require) {
        const LiveScript = require("livescript");
        resolve(LiveScript.compile(code));
      }
    }

    if (languageName === 'babel') {
      let options = { envName: 'production', presets: ['es2017'], targets: ">0.25%", babelrc: false };
      const result = Babel.transform(code, options)
      resolve(result.code)
    }

    else {
      resolve(code)
    }
  });
}