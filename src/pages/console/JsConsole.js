import React, { useState, useEffect, useContext } from 'react';
import Split from 'react-split';

import Navbar from './Navbar';

import './JsConsole.css';
import Linter from './Linter';
import { evalConsole, formatOutput } from '../../util/evalConsole';
import SplitPane from '../../components/SplitPane';
import { ControlledEditor } from '@monaco-editor/react'
import Editor from '../../components/Editor';
import { GlobalContext } from '../../providers/GlobalProvider';

export default function JsConsole () {

  const { globalState } = useContext(GlobalContext);
  const [iframeVal, setIframeVal] = useState('');
  const [language, setLangauge] = useState('javascript');

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

  const onEditorChange = (e, data) => {
    setEditorValue(data);
    localStorage.setItem('reacto-console', JSON.stringify(data))
  }

  const onRunCode = async () => {
    let result = null;
    let resultCompiler = null;
    let isTypeScript = language.startsWith('typescript');
    try {
      if (isTypeScript) {
        resultCompiler = await window.ts.transpileModule(editorValue, {
          compilerOptions: {
            allowJs: true,
            declaration: true,
            emitDeclarationOnly: true,
            noEmitOnError: true,
            noImplicitAny: true,
            target: window.ts.ScriptTarget.ES5,
            module: window.ts.ModuleKind.CommonJS
          }
        });
      }

      result = await evalConsole(isTypeScript ? resultCompiler.outputText : editorValue);
      setIframeVal(formatOutput(result));
    } catch (error) {
      setIframeVal(error);
    }
  };

  return <div className="w-100 h-100 cs-container pr-2 pl-2 overflow-hidden">

    <Navbar editorValue={editorValue} setEditorValue={setEditorValue} setLangauge={setLangauge} language={language} />

    <SplitPane>
      <ControlledEditor
        height="100%"
        width="50%"
        onChange={onEditorChange}
        value={editorValue}
        language={language}
        theme="vs-dark"
        options={{ minimap: { enabled: false }, fontSize: globalState.fontSize }}
      />

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

          <Linter jsValue={editorValue} language={language} />
        </Split>

      </div>
    </SplitPane>

  </div>;
}