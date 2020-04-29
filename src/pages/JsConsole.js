import React, { useState, useEffect, useRef, useCallback } from 'react';
import Editor from '../components/Editor';
import Split from 'react-split';

import Transpiler from '../containers/Transpiler';
import CsIframe from '../util/CsIframe';
import SidebarConsole from '../containers/SidebarConsole';

import '../styles/JsConsole.css';

const PreOut = ({ data }) => {

  return <pre>
    {data.map((d, i) => {
      console.log(d.toString())
      if (d.toString() === '[object Set]') {
        return <div key={'out' + i} className="text-warning mb-2">
          <span className="text-primary">[object Set]</span> {JSON.stringify([...d], null, 2)}</div>
      }
      if (d.toString() === '[object Map]') {
        return <div key={'out' + i} className="text-warning mb-2"><span className="text-primary">[object Map]</span> {JSON.stringify([...d], null, 2)}</div>
      }
      return <div key={'out' + i} className="text-warning mb-2">{JSON.stringify(d, null, 2)}</div>
    })}
  </pre>
}

export default function JsConsole () {

  const myIframe = useRef();
  const [iframeVal, setIframeVal] = useState([]);

  const [editorValue, setEditorValue] = useState(() => {
    let local = localStorage.getItem('reacto-console');
    return local ? JSON.parse(local) : 'console.log("Hello world")'
  });

  const [jsHintErrors, setJsHintErrors] = useState([]);
  const [state, setState] = useState({ isTranspiled: false, isCopied: false });

  useEffect(() => {
    let data = window.location.search.split('?cs=')[1];

    try {
      const decodedData = window.atob(data);
      setEditorValue(decodedData);
    } catch (error) {

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

  const onRunCode = useCallback(() => {
    
    const doc = myIframe.current.contentDocument;
    const script = doc.createElement('script');

    const blob = new Blob([editorValue], { type: 'application/javascript' });
    script.src = URL.createObjectURL(blob);

    console.log('runing...........');

    let a = [];
    myIframe.current.contentWindow.console.log = function (args) {
      console.log(Date.now(), args);

      a.push(args);
      setIframeVal([...a]);
    }
    console.log(doc.body);
    doc.innerHTML = ''
    doc.documentElement.appendChild(script);
  }, [iframeVal])

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
              <iframe
                ref={myIframe}
                title="js-console" ></iframe>

              <PreOut data={iframeVal} />
              <button className="btn-cs-run" onClick={() => { onRunCode() }}>
                <i className="fa fa-play"></i>
              </button>
            </div>

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