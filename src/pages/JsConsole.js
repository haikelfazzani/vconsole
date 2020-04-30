import React, { useState, useEffect, useCallback } from 'react';
import Editor from '../components/Editor';
import Split from 'react-split';

import Linter from '../containers/Linter';
import Transpiler from '../containers/Transpiler';
import SidebarConsole from '../containers/SidebarConsole';

import '../styles/JsConsole.css';

function removeElement (id) {
  var elem = document.getElementById(id);
  return elem.parentNode.removeChild(elem);
}

export default function JsConsole () {

  const [iframeVal, setIframeVal] = useState('');
  const [editorValue, setEditorValue] = useState(() => {
    let local = localStorage.getItem('reacto-console');
    return local ? JSON.parse(local) : 'console.log("Hello world")'
  });

  const [state, setState] = useState({ isTranspiled: false, isCopied: false });

  useEffect(() => {
    let data = window.location.search.split('?cs=')[1];
    try {
      const decodedData = window.atob(data);
      setEditorValue(decodedData);
    } catch (error) {}
  }, []);

  const onEditorChange = (editor, value, data) => {
    setEditorValue(data);
    localStorage.setItem('reacto-console', JSON.stringify(data))
  }

  const onRunCode = useCallback(() => {

    const iframe = document.createElement('iframe');
    iframe.id = 'js-console-iframe';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument;
    const script = doc.createElement('script');

    const blob = new Blob([editorValue], { type: 'application/javascript' });
    script.src = URL.createObjectURL(blob);

    doc.body.append(script);

    let logBackup = iframe.contentWindow.console.log;
    let logMessages = [];

    iframe.contentWindow.onerror = (message, file, line, col, error) => {
      setIframeVal(`(${line}:${col}) -> ${error}`);
    };

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

      setIframeVal(b.join('\n\n'));
    };

    setTimeout(() => { removeElement('js-console-iframe') }, 1000);
  }, [editorValue])

  return <div className="w-100 h-100 cs-container">

    <SidebarConsole
      state={state}
      setState={setState}
      editorValue={editorValue}
      setEditorValue={setEditorValue}
    />

    <Split sizes={[50, 50]}
      minSize={0}
      gutterSize={7}
      gutterAlign="center"
      direction="horizontal"
    >
      <Editor onChange={onEditorChange} value={editorValue} />

      <div className="d-flex cs-output">
        {!state.isTranspiled
          ? <Split sizes={[50, 50]}
            minSize={0}
            gutterSize={5}
            gutterAlign="center"
            direction="vertical"
          >
            <div className="output">
              <Editor value={iframeVal} lang="javascript" readOnly={true} />
              <button className="btn-cs-run" onClick={() => { onRunCode() }}>
                <i className="fa fa-play"></i>
              </button>
            </div>

            <Linter jsValue={editorValue} />
          </Split>

          : <Transpiler input={state.isTranspiled ? editorValue : ''} codeType='javascript' />}
      </div>

    </Split>
  </div>;
}