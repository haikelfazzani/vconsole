import React, { useState, useEffect, useCallback } from 'react';

import Editor from '../components/Editor';
import Split from 'react-split';

import SidebarConsole from '../containers/SidebarConsole';

import '../styles/JsConsole.css';
import Linter from '../containers/Linter';
import { evalConsole, formatOutput } from '../util/evalConsole';
import SplitPane from '../components/SplitPane';

export default function JsConsole () {

  const [iframeVal, setIframeVal] = useState('');

  const [editorValue, setEditorValue] = useState(() => {
    let local = localStorage.getItem('reacto-console');
    return local ? JSON.parse(local) : 'console.log("Hello world")'
  });

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

  const onEditorChange = (e,_, data) => {
    setEditorValue(data);
    localStorage.setItem('reacto-console', JSON.stringify(data))
  }

  const onRunCode = useCallback(async () => {
    try {
      let result = await evalConsole(editorValue);
      setIframeVal(formatOutput(result));
    } catch (error) {
      setIframeVal(error);
    }
  }, [editorValue]);

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
  }, [onRunCode]);

  return <div className="w-100 h-100 cs-container pr-2 pl-2">

    <SidebarConsole />

    <SplitPane>
      <Editor onChange={onEditorChange} value={editorValue} lang="javascript" />

      <div className="d-flex cs-output">

        <Split sizes={[50, 50]}
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

      </div>
    </SplitPane>

  </div>;
}