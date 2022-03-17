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
  const params = new URLSearchParams(window.location.search);
  let lang = params.get('language');
  let code = params.get('code');

  const { gstate, setGState } = useContext(GContext);
  const preRef = useRef();

  const [editorValue, setEditorValue] = useState(localStorage.getItem('editorValue') || '');
  const [message, setMessage] = useState('');

  const [showAddLib, setShowAddLib] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [isRunning, setIsRunning] = useState(false);

  const onEditorDidMount = (editor, monaco) => {
    let language = gstate.language;
    if (lang) {
      language = Languages.find(l => l.name === lang);
      setGState({ ...gstate, language });
    }

    Transpile.addOrRemoveFromDom(language.name)
    monaco.editor.setModelLanguage(editor.getModel(), language.syntax);
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
    if (code) {
      setEditorValue(decodeURIComponent(atob(code)));
    }

    window.addEventListener("message", onMessageFromWorker, false);
    return () => { window.removeEventListener("message", onMessageFromWorker, false); }
  }, []);

  const onEditorValueChange = value => {
    setEditorValue(value);
    localStorage.setItem('editorValue', value)
  }

  const onNavMenu = async (actionType) => {
    switch (actionType) {
      case 'add-lib':
        setShowAddLib(true);
        break;

      case 'reset':
        if (window.confirm("Do you want to clear console?")) {
          setEditorValue('');
        }
        break;

      case 'copy':
        Util.copy(editorValue);
        break;

      case 'download':
        Util.download(editorValue, 'App.' + gstate.language.extension);
        break;

      case 'info':
        setShowInfo(true);
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
        <button className="btn mr-3 shadow"><i className="fa fa-coffee mr-2"></i>Vconsole</button>

        {/* <Link to="/snippets" className="btn border-bottom" title="Snippets">
          <i className="fa fa-save"></i> snippets
        </Link>  */}
      </div>

      <div className='d-flex align-start'>
        <div className="vertical-align h-100 d-sm-none">
          <button className="h-100 btn mr-3" title="Clear Console" onClick={() => { onNavMenu('reset'); }}>
            <i className="fa fa-recycle"></i>
          </button>
        </div>

        <button className="btn mr-3" title="Add Library" onClick={() => { onNavMenu('add-lib'); }}>
          <i className="fa fa-plus"></i> library
        </button>

        <button className="btn mr-3" title="Change theme" onClick={() => { onConfigChange('theme'); }}>
          <i className="fa fa-adjust"></i>
        </button>

        <button className="btn mr-3" title="Info" onClick={() => { onNavMenu('info'); }}>
          <i className="fa fa-info-circle"></i>
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
            <button className="h-100 btn" title="Download Code" onClick={() => { onNavMenu('download'); }}><i className="fa fa-download"></i></button>
            <button className="h-100 btn" title="Copy Code" onClick={() => { onNavMenu('copy'); }}><i className="fa fa-copy"></i></button>
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

    <Modal showModal={showAddLib} setShowModal={setShowAddLib}><AddLib /></Modal>

    <Modal showModal={showInfo} setShowModal={setShowInfo}>
      <h3 className='blue'>How to embed Vconsole into your website</h3>
      <pre className='warning p-0'>{`const code = encodeURIComponent(btoa("console.log('hello')"));
const language = 'livescript';

https://vconsole.vercel.app?language=language&code=code`}</pre>
    </Modal>
  </main>;
}

export default withRouter(Playground);
