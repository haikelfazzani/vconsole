import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalStore';
import Split from 'react-split';

import AddLib from '../containers/AddLib';
import Modal from '../components/Modal';

import Editor from "@monaco-editor/react";
import Languages from '../utils/Languages';
import ConsoleHeader from '../containers/ConsoleHeader';
import OutputHeader from '../containers/OutputHeader';
import addOrRemoveElement from '../utils/addOrRemoveElement';

import '../styles/Playground.css';
import toJS from '../utils/toJS';
import RunCode from '../utils/RunCode';

function Playground() {
  const isMobile = window.innerWidth < 700,
    params = new URLSearchParams(window.location.search);

  const { gstate, dispatch } = useContext(GlobalContext);
  const { showAddLibModal, showInfoModal } = gstate;

  let lang = params.get('language'),
    code = params.get('code'),
    theme = params.get('theme') || gstate.theme,
    fontSize = params.get('fontSize') || gstate.fontSize,
    minimap = params.get('minimap') || gstate.minimap;

  const [editorValue, setEditorValue] = useState(localStorage.getItem('editorValue') || '');
  const [message, setMessage] = useState('');

  const onEditorDidMount = (editor, monaco) => {
    let language = gstate.language;
    if (lang) {
      language = Languages.find(l => l.name === lang);
    }

    addOrRemoveElement(language.name);

    const runner = async () => {
      dispatch({ type: 'isRunning', payload: { isRunning: true } });
      const code = localStorage.getItem('editorValue')
      RunCode(await toJS(code, gstate.language.name));
    }

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runner);
    monaco.editor.setModelLanguage(editor.getModel(), language.syntax);
  }

  const onMessageFromWorker = (e) => {
    if (e && e.data && !e.data.vscodeSetImmediateId) {
      let m = typeof e.data === 'string' ? e.data : '';
      if (!m.includes('webpackHotUpdate')) {
        setMessage(m);
        localStorage.setItem('output', m);
      }
    }
    dispatch({ type: 'isRunning', payload: { isRunning: false } });
  }

  const onEditorValueChange = value => {
    setEditorValue(value);
    localStorage.setItem('editorValue', value)
  }

  useEffect(() => {
    if (code) {
      setEditorValue(decodeURIComponent(atob(code)));
    }

    window.addEventListener("message", onMessageFromWorker, false);
    return () => {
      window.removeEventListener("message", onMessageFromWorker, false);
    }
  }, []);

  return <main>
    <Split direction={isMobile ? "vertical" : "horizontal"}
      minSize={0} gutterSize={7} className={"h-100 bg-dark playground d-flex" + (isMobile ? " flex-column" : "")}>
      <div className="h-100 bg-dark editor br7">
        <ConsoleHeader />

        <Editor
          height="calc(100% - 45px)"
          language={gstate.language.syntax}
          value={editorValue}
          theme={theme}
          onChange={onEditorValueChange}
          onMount={onEditorDidMount}
          options={{ fontSize: fontSize, minimap: { enabled: minimap } }}
        />
      </div>

      <div className="w-100 h-100 output">
        <OutputHeader />
        <pre className='w-100' style={{ fontSize: fontSize + 'px' }} dangerouslySetInnerHTML={{ __html: message }}></pre>
      </div>
    </Split>

    <Modal showModal={showAddLibModal} setShowModal={() => { dispatch({ type: 'show-add-lib-modal' }) }}><AddLib /></Modal>

    <Modal showModal={showInfoModal} setShowModal={() => { dispatch({ type: 'show-info-modal' }) }}>
      <pre className='p-0'>
        <h3 className='blue'>How to embed Vconsole into your website</h3>
        {`const code = encodeURIComponent(btoa("console.log('hello')"));
const language = 'livescript';
const theme = 'vs-dark'; // or 'vs-light'

https://vconsole.vercel.app?language=language&code=code&theme=theme`}
        <hr />
        <h3 className='blue'>Shortcuts</h3>
        CtrlCmd + Enter: Run code
      </pre>
    </Modal>
  </main>;
}

export default withRouter(Playground);
