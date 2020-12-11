import React, { useState, useEffect, useContext, Suspense } from 'react';
import Split from 'react-split';

import Header from './Header';
import Linter from './Linter';
import { evalConsole, formatOutput } from '../../util/evalConsole';
import SplitPane from '../../components/SplitPane';
import { ControlledEditor } from '@monaco-editor/react'
import EditorAce from '../../components/EditorAce';
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

  return <main>
    <Header
      editorValue={editorValue}
      setLangauge={setLangauge}
      language={language}
    />

    <SplitPane>
      <div className="h-100 editor">
        <ControlledEditor
          height="100%"
          width="100%"
          onChange={onEditorChange}
          value={editorValue}
          language={language}
          theme="vs-dark"
          options={{ minimap: { enabled: false }, fontSize: globalState.fontSize }}
        />

        <div className="menu horizontal-align">
          <button className="button btn-run fs-18 mb-10" onClick={() => { onRunCode() }}>
            <i className="fa fa-play"></i>
          </button>
        </div>
      </div>

      <Split sizes={[50, 50]}
        minSize={0}
        gutterSize={5}
        gutterAlign="center"
        direction="vertical"
      >
        <EditorAce value={iframeVal} />
        <Linter jsValue={editorValue} />
      </Split>
    </SplitPane>
  </main>;
}