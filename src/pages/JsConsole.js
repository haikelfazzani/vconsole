import React, { useState, useEffect, useCallback } from 'react';
import Editor from '../components/Editor';
import Split from 'react-split';

import Linter from '../containers/Linter';
import Transpiler from '../containers/Transpiler';
import SidebarConsole from '../containers/SidebarConsole';

import evalConsole from '../util/evalConsole';

import '../styles/JsConsole.css';

function removeElement (id) {
  let elem = document.getElementById(id);
  return elem.parentNode.removeChild(elem);
}

export default function JsConsole () {

  const [editorValue, setEditorValue] = useState(() => {
    let local = localStorage.getItem('reacto-console');
    return local ? JSON.parse(local) : 'console.log("Hello world")'
  });
  
  const [output, setOutput] = useState('');
  const [state, setState] = useState({ isTranspiled: false, isCopied: false });

  useEffect(() => {
    let data = window.location.search.split('?cs=')[1];
    try {
      const decodedData = window.atob(data);
      setEditorValue(decodedData);
    } catch (error) { }
  }, []);

  const onEditorChange = (editor, value, data) => {
    setEditorValue(data);
    localStorage.setItem('reacto-console', JSON.stringify(data))
  }

  const onRunCode = useCallback(async () => {
    try {
      let result = await evalConsole(editorValue);
      setOutput(result);
      removeElement('js-console-iframe');
    } catch (e) {
      setOutput(e);
      removeElement('js-console-iframe');
    }
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
              <Editor value={output} lang="javascript" readOnly={true} />
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