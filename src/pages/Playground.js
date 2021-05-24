import React, { useContext, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { GContext } from '../store/GlobalStore';
import Split from 'react-split';
import runCode from '../utils/runCode';

import Util from '../utils/Util';
import LocalData from '../utils/LocalData';

import './Playground.css';
import '../styles/dropdown.css';
import AddLib from '../containers/AddLib';
import Modal from '../containers/Modal';

const fontSizes = [12, 14, 16, 18, 20, 22, 24];

function Playground () {
  const editorRef = useRef(null);
  const outputRef = useRef(null);

  const { gstate, setGState } = useContext(GContext);

  const [aceEditor, setAceEditor] = useState(null);
  const [outputEditor, setOutputEditor] = useState(null);

  const [editorValue, setEditorValue] = useState(LocalData.getCode());

  const [showModal, setShowModal] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  const eoptions = {
    enableBasicAutocompletion: true,
    enableSnippets: false,
    enableLiveAutocompletion: true,
    highlightActiveLine: true,
    wrapBehavioursEnabled: true,
    showPrintMargin: true,
    showGutter: true,
    highlightGutterLine: true,
    fontSize: +gstate.fontSize,
    theme: 'ace/theme/monokai',
    useWorker: true,
    tabSize: 4,
    mode: 'ace/mode/javascript'
  }

  useEffect(() => {
    let element = editorRef.current;
    let oelement = outputRef.current;

    if (!aceEditor && element && window.ace) {
      const editor = window.ace.edit(element);
      editor.setValue(editorValue, 1);
      editor.setOptions(eoptions);
      editor.setFontSize(+gstate.fonSize);
      setAceEditor(editor);

      editor.getSession().on('change', function () {
        let val = editor.session.getValue();
        setEditorValue(val);
      });
    }

    const oeditor = window.ace.edit(oelement);
    oeditor.setOptions(eoptions);
    oeditor.getSession().setUseWorker(false);
    oeditor.setFontSize(14);
    setOutputEditor(oeditor);

    const receive = (e) => {
      if (e && (e.data.message || e.data)) {
        if (outputEditor) {
          outputEditor.setValue(e.data, 1);
          outputEditor.clearSelection();
        }
      }
    }

    window.addEventListener("message", receive, false);
    return () => { window.removeEventListener("message", receive, false); }
  }, [outputEditor]);

  const onAction = async (actionType) => {
    switch (actionType) {
      case 'save':
        aceEditor.setValue(editorValue, 1);
        setGState({ ...gstate, codeEditor: editorValue });
        setShowModal(true);
        LocalData.saveCode(editorValue);
        break;

      case 'add-lib':
        setShowModal(true);
        break;

      case 'reset':
        aceEditor.setValue('', 1);
        setEditorValue('');
        break;

      case 'copy':
        Util.copy(editorValue);
        setActionMsg('The code is copied')
        break;

      case 'download':
        Util.download(editorValue, 'App.js');
        break;

      case 'pretty':
        let val = Util.pretty(editorValue);
        aceEditor.setValue(val, 1);
        setEditorValue(val);
        break;

      case 'run':
        runCode(editorValue);
        LocalData.saveCode(editorValue);
        break;

      case 'close-snack':
        setActionMsg(null);
        break;

      default:
        break;
    }
  }

  const onFontSize = size => {
    aceEditor.setFontSize(+size);
    setGState({ ...gstate, fontSize: size });
    LocalData.setFontSize(size);
  }

  return <main>
    <div className="nav-playground d-flex justify-between">
      <div>
        {/* <Link className="btn mr-3" to="/"><i className="fa fa-home"></i> home</Link> */}
        <button className="btn mr-3"><i className="fa fa-terminal"></i> Vconsole</button>
      </div>

      <div>
        {/* <button className="btn mr-3" title="Save Code" onClick={() => { onAction('save'); }}>
          <i className="fa fa-save"></i> {operation || 'save'}
        </button> */}

        <div className="dropdown position-relative mr-3">
          <button type="button" className="btn bg-danger border-bottom">
            <i className="fa fa-font mr-2"></i>{gstate.fontSize}</button>
          <button className="btn dropdown-menu">
            {fontSizes.map(f => <div
              className="dropdown-item cp"
              key={f}
              onClick={() => { onFontSize(f) }}>{f}</div>)}
          </button>
        </div>

        <button className="btn mr-3" title="Add Library" onClick={() => { onAction('add-lib'); }}>
          <i className="fa fa-plus"></i> add lib
        </button>

        <button className="btn mr-3" title="Copy Code" onClick={() => { onAction('copy'); }}>
          <i className="fa fa-copy"></i> copy
        </button>

        <button className="btn" title="Download Code" onClick={() => { onAction('download'); }}>
          <i className="fa fa-download"></i> download
        </button>
      </div>
    </div>

    <Split gutterSize={10} className="playground d-flex">
      <div className="h-100 editor">
        <header className="w-100 menu">
          <div className="bg-black vertical-align text-uppercase pl-3 pr-3">
            <i className="fa fa-globe mr-2"></i> Editor</div>
          <div className="vertical-align h-100">
            <button className="btn" title="Format Code" onClick={() => { onAction('pretty'); }}><i className="fa fa-stream"></i></button>
            <button className="btn" title="Copy Code" onClick={() => { onAction('copy'); }}><i className="fa fa-copy"></i></button>
            <button className="btn bg-bleu" title="Run Code" onClick={() => { onAction('run'); }}><i className="fa fa-play"></i> run</button>
          </div>
        </header>

        <div ref={editorRef}></div>
      </div>

      <div className="w-100 h-100 output">
        <header className="w-100 menu">
          <div className="bg-black vertical-align text-uppercase pl-3 pr-3">
            <i className="fa fa-terminal mr-2"></i> output</div>

          <div className="vertical-align h-100">
            <button className="btn" title="Clear Code" onClick={() => { onAction('reset'); }}><i className="fa fa-recycle"></i></button>
          </div>
        </header>
        <div ref={outputRef}></div>
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