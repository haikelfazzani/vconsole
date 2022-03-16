import React, { useContext, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { GContext } from '../store/GlobalStore';
import Split from 'react-split';
import RunCode from '../utils/RunCode';

import Util from '../utils/Util';

import AddLib from '../containers/AddLib';
import Modal from '../containers/Modal';
import Transpile from '../utils/Transpile';
import './Playground.css';

import Editor from "@monaco-editor/react";
import Languages from '../utils/Languages';

const fontSizes = [12, 14, 16, 18, 20, 22, 24];

function Playground() {
  const { gstate, setGState } = useContext(GContext);
  const preRef = useRef();

  const [editorValue, setEditorValue] = useState(localStorage.getItem('editorValue') || '');
  const [message, setMessage] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  const onMessageFromWorker = (e) => {
    if (e && e.data && !e.data.vscodeSetImmediateId) {
      let m = typeof e.data === 'string' ? e.data : '';
      if (!m.includes('webpackHotUpdate')) setMessage(m)
    }
  }

  useEffect(() => {
    window.addEventListener("message", onMessageFromWorker, false);
    return () => { window.removeEventListener("message", onMessageFromWorker, false); }
  }, []);

  const onEditorDidMount = (editor, monaco) => {
    monaco.editor.defineTheme('myTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [{ background: '#001d36' }],
      colors: { 'editor.background': '#001d36' },
      fontSize: gstate.fontSize
    });

    monaco.editor.setTheme('myTheme');
    monaco.editor.setModelLanguage(editor.getModel(), gstate.language.syntax);

    preRef.current.style.fontSize = gstate.fontSize + 'px';
  }

  const onEditorValueChange = value => {
    setEditorValue(value);
    localStorage.setItem('editorValue', value)
  }

  const onAction = async (actionType) => {
    switch (actionType) {
      case 'add-lib':
        setShowModal(true);
        break;

      case 'reset':
        if (window.confirm("Do you want to clear console?")) {
          setEditorValue('');
        }
        break;

      case 'copy':
        Util.copy(editorValue);
        setActionMsg('The code is copied')
        break;

      case 'download':
        Util.download(editorValue, 'App.' + gstate.language.extension);
        break;

      case 'run':
        try {
          RunCode(await Transpile.toJs(editorValue, gstate.language.name));
        } catch (error) {

        }
        break;

      case 'close-snack':
        setActionMsg(null);
        break;

      default:
        break;
    }
  }

  const onConfigChange = (key, value) => {
    let nconfig = {};

    if (key === 'fontSize') {
      nconfig = { ...gstate, fontSize: value };
      preRef.current.style.fontSize = value + 'px';
    }
    if (key === 'language') {
      nconfig = { ...gstate, language: value };
      Transpile.addOrRemoveFromDom(value.name)
    }

    setGState(nconfig);
    localStorage.setItem('config', JSON.stringify(nconfig))
  }

  return <main>
    <header className="w-100 d-flex justify-between">
      <div>
        <button className="btn mr-3 border-bottom"><i className="fa fa-terminal"></i> Vconsole</button>

        {/* <Link to="/snippets" className="btn border-bottom" title="Snippets">
          <i className="fa fa-save"></i> snippets
        </Link>  */}
      </div>

      <div className='d-flex align-start'>
        <div className="dropdown position-relative mr-3">
          <button type="button" className="btn">
            <span><i className="fa fa-code mr-1"></i>{gstate.language.name}</span>
          </button>
          <ul className="btn dropdown-menu bg-dark">
            {Languages.map(lang => <li
              className="dropdown-item cp"
              key={lang.id}
              onClick={() => { onConfigChange('language', lang) }}>{lang.name}</li>)}
          </ul>
        </div>

        <div className="dropdown position-relative mr-3">
          <button type="button" className="btn"><i className="fa fa-font"></i> {gstate.fontSize}</button>
          <ul className="btn dropdown-menu bg-dark">
            {fontSizes.map(f => <li
              className="dropdown-item cp"
              key={f}
              onClick={() => { onConfigChange('fontSize', f) }}>{f}</li>)}
          </ul>
        </div>

        <button className="btn mr-3" title="Add Library" onClick={() => { onAction('add-lib'); }}>
          <i className="fa fa-plus"></i> library
        </button>

        <button className="btn mr-3" title="Download Code" onClick={() => { onAction('download'); }}>
          <i className="fa fa-download"></i>
        </button>

        <a className="btn" href="https://github.com/haikelfazzani/vconsole"><i className="fab fa-github"></i></a>
      </div>
    </header>

    <Split minSize={0} gutterSize={10} className="playground d-flex">
      <div className="h-100 editor">
        <header className="w-100 menu">
          <div className="bg-black vertical-align text-uppercase pl-3 pr-3">
            <i className="fa fa-globe mr-2"></i> Console</div>
          <div className="vertical-align h-100">
            <button className="btn" title="Format Code" onClick={() => { onAction('pretty'); }}><i className="fa fa-stream"></i></button>
            <button className="btn" title="Copy Code" onClick={() => { onAction('copy'); }}><i className="fa fa-copy"></i></button>
            <button className="btn bg-bleu" title="Run Code" onClick={() => { onAction('run'); }}><i className="fa fa-play"></i> run</button>
          </div>
        </header>

        <Editor
          height="calc(100% - 45px)"
          language={gstate.language.syntax}
          value={editorValue}
          theme="vs-dark"
          onChange={onEditorValueChange}
          onMount={onEditorDidMount}
          options={{ fontSize: gstate.fontSize }}
        />
      </div>

      <div className="w-100 h-100 output">
        <header className="w-100 menu">
          <div className="bg-black vertical-align text-uppercase pl-3 pr-3">
            <i className="fa fa-terminal mr-2"></i> {gstate.language.name} {gstate.language.version}</div>

          <div className="vertical-align h-100">
            <button className="btn" title="Clear Console" onClick={() => { onAction('reset'); }}>
              <i className="fa fa-recycle"></i>
            </button>
          </div>
        </header>

        <pre className='w-100' ref={preRef} dangerouslySetInnerHTML={{ __html: message }}></pre>
      </div>
    </Split>


    <Modal showModal={showModal} setShowModal={setShowModal}>
      <AddLib />
    </Modal>

    <div className={"bg-dark snackbar" + (actionMsg ? ' d-flex' : ' d-none')}>
      <p className="m-0">{actionMsg}</p>
      <button className="btn p-0 ml-3 bg-transparent" onClick={() => { onAction('close-snack'); }}>x</button>
    </div>
  </main>;
}

export default withRouter(Playground);
