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

  const [state, setState] = useState({ isTranspiled: false, isCopied: false });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let data = window.location.search.split('?cs=')[1];
      try {
        const decodedData = window.atob(data);
        setEditorValue(decodedData);
      } catch (error) { }
    }
    return () => { isMounted = false; }
  }, []);

  const onEditorChange = (e, v, data) => {
    setEditorValue(data);
    localStorage.setItem('reacto-console', JSON.stringify(data))
  }

  const onRunCode = async () => {
    try {
      await evalConsole(editorValue);
    } catch (error) { }

    function onMsg (msg) {
      setIframeVal(msg.data);
    }
    window.addEventListener("message", onMsg, false);
  }

  useEffect(() => {
    let isMounted = true;

    const keydownHandler = async (e) => {
      if (e.keyCode === 13 && e.ctrlKey) {
        await onRunCode();
      }
    }

    if (isMounted) {
      window.addEventListener('keydown', keydownHandler, false);
    }

    return () => {
      document.removeEventListener('keydown', keydownHandler);
      isMounted = false;
    }
  }, []);

  return <div className="w-100 h-100 cs-container pr-2 pl-2">

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

              <button className="btn-cs-run " onClick={() => { onRunCode() }}>
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