import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalStore';
import Split from 'react-split';
import unquer from 'unquer'

import AddLib from '../containers/AddLib';
import Modal from '../components/Modal';

import Editor from "@monaco-editor/react";
import ConsoleHeader from '../containers/ConsoleHeader';
import OutputHeader from '../containers/OutputHeader';

import RunJs from '../utils/RunJs';
import Snackbar from '../components/Snackbar';
import Tabs from '../utils/Tabs';
import '../styles/Playground.css';
import BitbucketSnippetService from '../services/BitbucketSnippetService';

function Playground() {
  const params = unquer.parse(window.location.href);
  const isMobile = window.innerWidth < 700;

  const { gstate, dispatch } = useContext(GlobalContext);
  const { tabIndex, editorOptions } = gstate;
  let { fontSize, minimap, tabSize } = editorOptions;

  const [message, setMessage] = useState('');

  const onEditorDidMount = async (editor, monaco) => {
    let language = gstate.language;

    if (params && params.s && params.s !== 0) {
      try {
        const snippet = await BitbucketSnippetService.getContent(params.s);
        Tabs.updateOne(0, snippet.code);
        localStorage.setItem('snippet', JSON.stringify(snippet));
      } catch (error) { }
    }

    const runner = () => {
      dispatch({ type: 'isRunning', payload: { isRunning: true } });
      RunJs.run(Tabs.getContent(), gstate.language.name);
    }

    dispatch({ type: 'language', payload: { language } });
    editor.getModel().updateOptions({ fontSize, tabSize, minimap: { enabled: minimap } });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runner);
    monaco.editor.setModelLanguage(editor.getModel(), language?.syntax);
  }

  const onMessageFromWorker = (e) => {
    const data = e.data;

    if (data && (/webpack/gi.test(data.type || data) || data.vscodeSetImmediateId || data.vscodeScheduleAsyncWork)) return;

    if (data.type && data.type === 'transpiler-error') {
      RunJs.run(Tabs.getContent(), gstate.language?.name);
      return;
    }

    setMessage(data);
    dispatch({ type: 'isRunning', payload: { isRunning: false } });
    localStorage.setItem('output', data);
  }

  const onEditorValueChange = value => {
    Tabs.updateOne(tabIndex, value);
  }

  useEffect(() => {
    window.addEventListener("message", onMessageFromWorker, false);
    return () => {
      window.removeEventListener("message", onMessageFromWorker, false);
    }
  }, []);

  return <main>
    <Split
      direction={isMobile ? "vertical" : "horizontal"}
      minSize={0}
      gutterSize={7}
      className={"h-100 bg-dark playground d-flex" + (isMobile ? " flex-column" : "")}>
      <div className="h-100 bg-dark editor br7">
        <ConsoleHeader />

        <Editor
          height="calc(100% - 45px)"
          language={gstate.language?.syntax}
          value={Tabs.getOne(tabIndex).content}
          path={'app-' + tabIndex + '.' + gstate.language?.extension}
          onChange={onEditorValueChange}
          onMount={onEditorDidMount}
          theme={editorOptions.theme}
          options={editorOptions}
        />
      </div>

      <div className="w-100 h-100 output">
        <OutputHeader />
        {gstate.language?.name === 'html'
          ? <iframe className='w-100 h-100' title='sandbox' srcDoc={message}></iframe>
          : <pre className='w-100' style={{ fontSize: fontSize + 'px' }} dangerouslySetInnerHTML={{ __html: message }}></pre>}
      </div>
    </Split>

    <Modal showModal={gstate.showAddLibModal} setShowModal={() => { dispatch({ type: 'show-add-lib-modal' }) }}><AddLib /></Modal>

    <Snackbar />
  </main>;
}

export default withRouter(Playground);
