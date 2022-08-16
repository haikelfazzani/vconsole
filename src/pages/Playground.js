import React, { useContext, useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalStore';
import Split from 'react-split';
import unquer from 'unquer'

import AddLib from '../containers/AddLib';
import Modal from '../components/Modal';

import Editor from "@monaco-editor/react";
import ConsoleHeader from '../containers/ConsoleHeader';
import OutputHeader from '../containers/OutputHeader';

import IframeView from '../utils/IframeView';
import Tabs from '../utils/Tabs';
import BitbucketSnippetService from '../services/BitbucketSnippetService';
import FormCreateOrUpdate from '../containers/FormCreateOrUpdate';

import ReactMarkdown from 'react-markdown';
import broadcastChannel from '../utils/broadcastChannel';
import '../styles/Playground.css';

function Playground() {
  const params = unquer.parse(window.location.href);
  const isMobile = window.innerWidth < 700;

  const { gstate, dispatch } = useContext(GlobalContext);
  const { tabIndex, editorOptions } = gstate;
  let { fontSize, minimap, tabSize } = editorOptions;

  const [message, setMessage] = useState('');

  const onEditorDidMount = useCallback(async (editor, monaco) => {
    let language = gstate.language;

    if (params && params.s && params.s !== 0) {
      try {
        const snippet = await BitbucketSnippetService.getContent(params.s);
        Tabs.updateOne(0, snippet.code);
        localStorage.setItem('snippet-filename', snippet.filename);
        localStorage.setItem('snippet-title', snippet.title);
      } catch (error) { }
    }

    const runner = () => {
      dispatch({ type: 'isRunning', payload: { isRunning: true } });
      IframeView.display(Tabs.getContent(), gstate.language.name);
    }

    dispatch({ type: 'language', payload: { language } });
    editor.getModel().updateOptions({ fontSize, tabSize, minimap: { enabled: minimap } });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runner);
    monaco.editor.setModelLanguage(editor.getModel(), language?.syntax);
  }, []);

  const onEditorValueChange = value => {
    Tabs.updateOne(tabIndex, value);
    if (gstate.language.name === 'markdown') {
      dispatch({ type: 'isRunning', payload: { isRunning: false } });
    }
  }

  const onWorker = event => {
    const { source, result, error, msg } = event.data;

    if (source === 'service-worker') {
      IframeView.display(result);
    }

    if (error) {
      setMessage(error);
    }

    if (source === 'iframe' && !error) {
      setMessage(result);
      localStorage.setItem('output', result);
      dispatch({ type: 'isRunning', payload: { isRunning: false } });
    }

    if(source === 'service-worker' && msg) {
      dispatch({ type: 'isRunning', payload: { isRunning: false } });
      dispatch({ type: 'show-snackbar', payload: { showSnackbar: true, message: msg } });
    }
  }

  useEffect(() => {
    broadcastChannel.addEventListener('message', onWorker)
    return () => {
      broadcastChannel.removeEventListener('message', onWorker);
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
          : gstate.language?.name === 'markdown'
            ? <div className='markdown'><ReactMarkdown>{Tabs.getOne(tabIndex).content}</ReactMarkdown></div>
            : <pre className='w-100' style={{ fontSize: fontSize + 'px' }}
              dangerouslySetInnerHTML={{ __html: message }}></pre>}
      </div>
    </Split>

    <Modal showModal={gstate.showCreateOrUpdateModal} setShowModal={() => { dispatch({ type: 'show-create-or-update-modal' }) }}>
      <FormCreateOrUpdate />
    </Modal>

    <Modal showModal={gstate.showAddLibModal} setShowModal={() => { dispatch({ type: 'show-add-lib-modal' }) }}>
      <AddLib />
    </Modal>    
  </main>;
}

export default withRouter(Playground);
