import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';
import Split from 'react-split';

import Transpiler from '../containers/Transpiler';
import SidebarConsole from '../containers/SidebarConsole';

import '../styles/JsConsole.css';
import Linter from '../containers/Linter';
import evalConsole from '../util/evalConsole';

export default function JsConsole () {

  const [iframeVal, setIframeVal] = useState('');

  const [editorValue, setEditorValue] = useState(() => {
    let local = localStorage.getItem('reacto-console');
    return local ? JSON.parse(local) : 'console.log("Hello world")'
  });

  const [state, setState] = useState({
    isTranspiled: false,
    isCopied: false,
    isRunning: false,
    elapsedTime: 0
  });

  useEffect(() => {
    let data = window.location.search.split('?cs=')[1];
    try {
      const decodedData = window.atob(data);
      setEditorValue(decodedData);
    } catch (error) { }
  }, []);

  const onEditorChange = (data) => {
    setEditorValue(data);
    localStorage.setItem('reacto-console', JSON.stringify(data))
  }

  const onRunCode = async () => {
    let startTime = (new Date()).getTime();

    setState({ ...state, isRunning: true });
    await evalConsole(editorValue);

    function onMsg (msg) {
      let endTime = (new Date()).getTime();
      setIframeVal(msg.data);
      setState({ ...state, isRunning: false, elapsedTime: (endTime - startTime) });
    }
    window.addEventListener("message", onMsg, false);
  }

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
      <Editor onChange={onEditorChange} value={editorValue} lang="javascript" />

      <div className="d-flex cs-output">
        {!state.isTranspiled
          ? <Split sizes={[50, 50]}
            minSize={0}
            gutterSize={5}
            gutterAlign="center"
            direction="vertical"
          >
            <div className="output">
              <Editor value={iframeVal} lang="javascript" showLineNumbers={false} readOnly={true} />

              <button
                className={"btn-cs-run " + (state.isRunning ? 'bg-primary' : '')}
                onClick={() => { onRunCode() }}>
                <i className="fa fa-play"></i>
              </button>

              {state.elapsedTime > 0
                && <span className="elapsed-time">
                  {state.elapsedTime + ' ms'}
                </span>}
            </div>

            <Linter jsValue={editorValue} />
          </Split>

          : <Transpiler input={state.isTranspiled ? editorValue : ''} codeType='javascript' />}
      </div>

    </Split>
  </div>;
}