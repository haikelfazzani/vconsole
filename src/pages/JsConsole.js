import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';
import Split from 'react-split';

import Transpiler from '../containers/Transpiler';
import CsIframe from '../util/CsIframe';
import CsSidebar from '../containers/CsSidebar';

import '../styles/JsConsole.css';

export default function JsConsole () {

  const [editorValue, setEditorValue] = useState(() => {
    let local = localStorage.getItem('reacto-console');
    return local ? JSON.parse(local) : 'console.log("Hello world")'
  });

  const [jsHintErrors, setJsHintErrors] = useState([]);

  const [state, setState] = useState({ isTranspiled: false, isCopied: false });

  useEffect(() => {
    let data = window.location.search.split('=')[1];

    if (data) {
      const decodedData = window.atob(data);
      const jsonVal = JSON.parse(decodedData);
      setEditorValue(jsonVal);
    }
  }, []);

  const onEditorChange = (editor, value, data) => {
    setEditorValue(data);

    localStorage.setItem('reacto-console', JSON.stringify(data))

    window.JSHINT(data, { asi: true, lastsemic: false, esnext: true });

    setJsHintErrors(window.JSHINT.errors.map(e => {
      return { reason: e.reason, line: e.line }
    }));
  }

  return <div className="w-100 h-100 cs-container">

    <CsSidebar state={state} setState={setState} editorValue={editorValue} setEditorValue={setEditorValue} />

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
            <iframe title="js-console" srcDoc={CsIframe(jsHintErrors.length > 0 ? '' : editorValue)}></iframe>

            <ul className="linter">
              <li className="header"><i className="fas fa-bug"></i> Linter</li>
              {jsHintErrors.map((l, i) => <li key={'linter' + i}>
                <i className="fas fa-angle-right"></i> {'Line ' + l.line + ':'} {l.reason}
              </li>)}
            </ul>
          </Split>

          : <Transpiler input={state.isTranspiled ? editorValue : ''} codeType='javascript' />}
      </div>

    </Split>
  </div>;
}