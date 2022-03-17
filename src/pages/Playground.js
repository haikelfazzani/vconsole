import React, { useContext, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { GContext } from '../store/GlobalStore';
import Split from 'react-split';
import RunCode from '../utils/RunCode';

import Util from '../utils/Util';

import AddLib from '../containers/AddLib';
import Modal from '../containers/Modal';
import Transpile from '../utils/Transpile';

import Editor from "@monaco-editor/react";
import Languages from '../utils/Languages';
import '../styles/Playground.css';

const fontSizes = [10, 12, 14, 16, 18, 20, 22, 24];

function Playground() {
  const { gstate, setGState } = useContext(GContext);
  const preRef = useRef();

  const [editorValue, setEditorValue] = useState(localStorage.getItem('editorValue') || '');
  const [message, setMessage] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  const [isRunning, setIsRunning] = useState(false);

  const onEditorDidMount = (editor, monaco) => {
    Transpile.addOrRemoveFromDom(gstate.language.name)
    monaco.editor.setModelLanguage(editor.getModel(), gstate.language.syntax);
    preRef.current.style.fontSize = gstate.fontSize + 'px';
  }

  const onMessageFromWorker = (e) => {
    if (e && e.data && !e.data.vscodeSetImmediateId) {
      let m = typeof e.data === 'string' ? e.data : '';
      if (!m.includes('webpackHotUpdate')) {
        setMessage(m);
        setIsRunning(false)
      }
    }
  }

  useEffect(() => {
    window.addEventListener("message", onMessageFromWorker, false);
    return () => { window.removeEventListener("message", onMessageFromWorker, false); }
  }, []);

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

      default:
        break;
    }
  }

  const onRun = async () => {
    try {
      setIsRunning(true)
      RunCode(await Transpile.toJs(editorValue, gstate.language.name));
    } catch (error) {
      console.log(error);
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

    if (key === 'theme') {
      const theme = gstate.theme === 'vs-dark' ? 'vs-light' : 'vs-dark';
      nconfig = { ...gstate, theme };
      document.documentElement.setAttribute('data-theme', theme.replace('vs-', ''));
    }

    setGState(nconfig);
    localStorage.setItem('config', JSON.stringify(nconfig))
  }

  return <main>
    <header className="w-100 d-flex justify-between align-start d-sm-none">
      <div>
        <button className="btn mr-3"><i className="fa fa-coffee mr-2"></i>Vconsole</button>

        {/* <Link to="/snippets" className="btn border-bottom" title="Snippets">
          <i className="fa fa-save"></i> snippets
        </Link>  */}
      </div>

      <div className='d-flex align-start'>
        <div className="vertical-align h-100 d-sm-none">
          <button className="h-100 btn mr-3" title="Clear Console" onClick={() => { onAction('reset'); }}>
            <i className="fa fa-recycle"></i>
          </button>
        </div>

        <button className="btn mr-3" title="Add Library" onClick={() => { onAction('add-lib'); }}>
          <i className="fa fa-plus"></i> library
        </button>

        <button className="btn mr-3" title="Change theme" onClick={() => { onConfigChange('theme'); }}>
          <i className="fa fa-adjust"></i>
        </button>

        <a className="btn" href="https://github.com/haikelfazzani/vconsole"><i className="fab fa-github"></i></a>
      </div>
    </header>

    <Split minSize={0} gutterSize={10} className="bg-dark playground d-flex">
      <div className="h-100 editor">
        <header className="w-100 bg-light d-flex justify-between">
          <div className="bg-dark vertical-align text-uppercase pl-3 pr-3 d-sm-none">
            <i className="fa fa-terminal mr-2"></i>Console</div>
          <div className="h-100 d-flex">
            <button className="h-100 btn" title="Download Code" onClick={() => { onAction('download'); }}><i className="fa fa-download"></i></button>
            <button className="h-100 btn" title="Copy Code" onClick={() => { onAction('copy'); }}><i className="fa fa-copy"></i></button>
            <button className="h-100 btn bg-bleu" title="Run Code" onClick={onRun} disabled={isRunning}><i className="fa fa-play mr-1"></i>run</button>
          </div>
        </header>

        <Editor
          height="calc(100% - 45px)"
          language={gstate.language.syntax}
          value={editorValue}
          theme={gstate.theme}
          onChange={onEditorValueChange}
          onMount={onEditorDidMount}
          options={{ fontSize: gstate.fontSize }}
        />
      </div>

      <div className="w-100 h-100 output">
        <header className="w-100 bg-light d-flex justify-between">

          <div className="h-100 dropdown position-relative mr-3">
            <button type="button" className="h-100 btn border-0">
              <span><i className="fas fa-chevron-circle-down mr-2"></i>{gstate.language.name} {gstate.language.version}</span>
            </button>

            <ul className="dropdown-menu bg-light">
              {Languages.map(lang => <li
                className="dropdown-item cp"
                key={lang.id}
                onClick={() => { onConfigChange('language', lang) }}>{lang.name} {lang.version}</li>)}
            </ul>
          </div>

          <div className="dropdown position-relative">
            <button type="button" className="h-100 btn"><i className="fa fa-font"></i> {gstate.fontSize}</button>
            <ul className="btn dropdown-menu bg-light">
              {fontSizes.map(f => <li
                className="dropdown-item cp"
                key={f}
                onClick={() => { onConfigChange('fontSize', f) }}>{f}</li>)}
            </ul>
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
