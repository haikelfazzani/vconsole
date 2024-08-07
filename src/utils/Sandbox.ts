import { Tab } from "../type";
import { transform } from "sucrase";

function isTypedArray(arr) {
  return ArrayBuffer.isView(arr) && !(arr instanceof DataView);
}

const broadcastChannel = new BroadcastChannel('console-channel');

export default class Sandbox {
  static iframe: any;
  static iframeDoc: any;
  static iframeWin: any;

  static init() {
    const iframe: any = document.getElementById('sandbox');
    this.iframe = iframe;
    this.iframeDoc = iframe.contentDocument;
    this.iframeWin = iframe.contentWindow;
  }

  private static formatMessages(messages: string[]) {

    return messages.map((msg: any) => {

      if (typeof msg === 'string') return `<span class="red">"${msg}"</span>`;
      if (typeof msg === 'number') return `<span class="blue">${msg}</span>`;

      if (Array.isArray(msg)) return `<span class="yellow">Array (${msg.length})</span> ${JSON.stringify(msg, null, 2)}`;

      const objType = Object.prototype.toString.call(msg);

      if (['ArrayBuffer', 'DataView'].some(v => objType.includes(v))) {
        return `<span class="green">${objType} (${msg.byteLength})</span> {...}`;
      }

      if (isTypedArray(msg)) {
        return `<span class="green">${objType} (${msg.byteLength})</span> [${msg}]`;
      }

      if (objType === '[object Map]' || objType === '[object Set]') {
        let arr = [...msg];
        return `${msg.toString()} <span class="green">(${arr.length})</span> ${JSON.stringify(arr, null, 2)}`;
      }
      if (objType === '[object Object]') {
        return `<span class="green">${msg.toString()}</span> ${JSON.stringify(msg, null, 2)}`;
      }

      return (msg === undefined) ? 'undefined' : `<span class="blue">${JSON.stringify(msg, null, 2)}</span>`;
    })
      .join('\n');
  }

  static evaluate(tabs: Tab[]) {

    let htmlCode = '';
    let cssCode = '';
    let jsCode = '';

    tabs.forEach(tab => {
      if (tab.language === 'html') htmlCode += tab.code + '\n';
      if (tab.language === 'css') cssCode += tab.code + '\n';
      if (['javascript','typescript'].includes(tab.language)) jsCode += tab.code + '\n';
    });

    try {
      const compiledCode = transform(jsCode, { transforms: ["jsx", "typescript", "imports"] }).code;
      this.render({ htmlCode, jsCode: compiledCode, cssCode });
    } catch (error) {
      broadcastChannel.postMessage({ source: 'transform', result: error.message });
    }
  }

  private static render({ htmlCode, jsCode, cssCode }) {
    this.iframeDoc.open();
    this.iframeDoc.write(`<html>

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sandbox</title>
    </head>
    <script src="https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
    
    <body>
      <style>${cssCode}</style>
      ${htmlCode}
    </body>
    
    </html>`);

    try {
      this.iframeWin.onload = () => {
        const script = document.createElement('script');
        script.type = "module";
        script.text = `const { useInsertionEffect, useId, useReducer,useDeferredValue,useDebugValue,useActionState,useContext, useOptimistic, useLayoutEffect, useMemo, forwardRef, useImperativeHandle, useRef, useState, useEffect, useCallback, useTransition, useSyncExternalStore } = React; ${jsCode}`;
        script.defer = true;

        this.iframeDoc.body.appendChild(script);

        script.onerror = function () {
          console.log(`Error loading script: ${this.src}`);
        };

        let messages = [];

        this.iframeWin.console.log = (...args: any) => {
          messages.push(...args)
          broadcastChannel.postMessage({ source: 'iframe', result: this.formatMessages(messages) });
        };
      }

      this.iframeWin.onerror = (message, _, lineno, colno) => {
        const errors = jsCode
          .split('\n')
          .map((line, i) => (lineno - 1 === i ? '> ' : '  ') + `${i + 1} | ${line.trim()}`)
          .slice(lineno > 0 ? lineno - 1 : 0, lineno + 1);

        broadcastChannel.postMessage({ source: 'iframe', result: `${message} (${lineno}:${colno})\n\n${errors.join('\n')}` });
      };

    } catch (e) {
      broadcastChannel.postMessage({ source: 'iframe', result: e.message })
    } finally {
      this.iframeDoc.close();
    }
  }
}