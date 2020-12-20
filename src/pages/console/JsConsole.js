import React, { useState, useEffect } from 'react';
import Split from 'react-split';

import Header from './Header';
import Linter from './Linter';
import { evalConsole, formatOutput } from '../../util/evalConsole';
import EditorAce from '../../components/EditorAce';
import downloadCode from '../../util/downloadCode';
import Prettier from '../../util/Prettier';

export default function JsConsole () {

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

  const onEditorChange = (data) => {
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

  const onPrettier = () => {
    const formattedCode = Prettier(editorValue);
    setEditorValue(formattedCode);
  }

  const onDownload = () => {
    downloadCode(editorValue, 'reacto.' + (language.startsWith('type') ? 'ts' : 'js'));
  }

  return <main>
    <Header setLangauge={setLangauge} language={language} />

    <Split gutterSize={5}>
      <div className="h-100 editor">
        <EditorAce onChange={onEditorChange} value={editorValue} language={language} />
        <div className="menu horizontal-align">
          <button className="button btn-run fs-18 mb-10" onClick={() => { onRunCode() }}>
            <i className="fa fa-play"></i>
          </button>

          <button className="button btn-run fs-18 mb-10" onClick={onPrettier}>
            <i className="fa fa-stream"></i>
          </button>

          <button className="button btn-run fs-18" onClick={onDownload}>
            <i className="fa fa-download"></i>
          </button>
        </div>
      </div>

      <Split sizes={[50, 50]} minSize={0} gutterSize={5} gutterAlign="center" direction="vertical" >
        <EditorAce value={iframeVal} language={language} />
        <Linter jsValue={editorValue} />
      </Split>
    </Split>
  </main>;
}