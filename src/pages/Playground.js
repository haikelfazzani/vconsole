import React, { useEffect, useRef, useState } from 'react';
import Split from 'react-split';
import Sidebar from '../components/Sidebar';
import FormSave from '../containers/FormSave';
import runCode from '../utils/runCode';
import Util from '../utils/Util';
import './Playground.css';

const eoptions = {
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: false,
  highlightActiveLine: true,
  wrapBehavioursEnabled: true,
  showPrintMargin: true,
  showGutter: true,
  highlightGutterLine: true,
  fontSize: 16,
  theme: 'ace/theme/monokai',
  useWorker: false,
  tabSize: 4,
  mode: 'ace/mode/javascript'
}

export default function Playground () {

  const editorRef = useRef(null);
  const outputRef = useRef(null);

  const [aceEditor, setAceEditor] = useState(null);
  const [actionMsg, setActionMsg] = useState('');

  const local = localStorage.getItem('editor-value');
  const [editorValue, setEditorValue] = useState(local ? JSON.parse(local) : 'console.log("Hello world")');

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let element = editorRef.current;
    if (element && window.ace) {
      const editor = window.ace.edit(element);
      editor.setValue(editorValue, 1);
      editor.setOptions(eoptions);
      setAceEditor(editor);
      editor.getSession().on('change', function () {
        let val = editor.session.getValue();
        setEditorValue(val);
      });
    }

    const receive = (e) => {
      if (e && (e.data.message || e.data)) {
        if (outputRef && outputRef.current) {
          let element = outputRef.current;
          const editor = window.ace.edit(element);
          editor.setValue(e.data, 1);
          editor.setOptions(eoptions);
          editor.clearSelection();
        }
      }
    }

    window.addEventListener("message", receive, false);
    return () => { window.removeEventListener("message", receive, false); }
  }, []);

  const onAction = (actionType) => {
    switch (actionType) {
      case 'save':
        setShowModal(true);
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

      case 'close-snack':
        setActionMsg(null);
        break;

      default:
        runCode(editorValue);
        localStorage.setItem('editor-value', JSON.stringify(editorValue));
        break;
    }
  }

  return <div className="w-100 playground">
    <Split gutterSize={7}>
      <div className="h-100 editor">
        <div className="w-100 h-100" ref={editorRef}></div>
        <div className="menu">
          <button className="mb-3 bg-dark box-shad" onClick={() => { onAction('run'); }}><i className="fa fa-play"></i></button>
          <button className="mb-3 bg-dark box-shad" onClick={() => { onAction('pretty'); }}><i className="fa fa-stream"></i></button>
          <button className="mb-3 bg-dark box-shad" onClick={() => { onAction('copy'); }}><i className="fa fa-copy"></i></button>
          <button className="mb-3 bg-dark box-shad" onClick={() => { onAction('download'); }}><i className="fa fa-download"></i></button>
          <button className="mb-3 bg-dark box-shad" onClick={() => { onAction('save'); }}><i className="fa fa-save"></i></button>
        </div>
      </div>

      <div className="w-100 h-100" ref={outputRef}></div>
    </Split>

    <div className={"snackbar" + (actionMsg ? ' d-flex' : ' d-none')}>
      <p className="m-0 mr-3">{actionMsg}</p>
      <button className="p-0 bg-inherit" onClick={() => { onAction('close-snack'); }}>x</button>
    </div>

    {/* <Sidebar setEditorValue={setEditorValue} aceEditor={aceEditor} /> */}

    <div className={"modal vertical-align justify-center flex-wrap"+(showModal?'':' d-none')}>
      <div className="w-50 vertical-align justify-center flex-wrap p-20 bg-dark box-shad">
        <button className="btn-close-modal bg-inherit" onClick={()=>{setShowModal(false)}}>X</button>        
        <FormSave />
      </div>
    </div>
  </div>;
}
