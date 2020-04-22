import React, { useState, useEffect, useContext } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import GlobalContext from '../providers/GlobalContext';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/jsx/jsx';

import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/fold/foldgutter.css'

import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchtags';

import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';

const hintOptions = { disableKeywords: false, completeSingle: false, completeOnSingleClick: false };

export default function Editor (props) {

  const { state } = useContext(GlobalContext);
  const [options, setOptions] = useState({});

  useEffect(() => {
    document.querySelector('.CodeMirror').style.fontSize = state.fontSize;
  }, [state.fontSize]);

  const onKeyPress = (editor, event) => {
    if (event.keyCode > 64 && event.keyCode < 123) {
      setTimeout(() => { editor.showHint(hintOptions); }, 200);
    }
  }

  const onEditorDidMount = (codeMirror) => {
    setOptions({
      mode: 'jsx',
      theme: 'monokai',
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      autoCloseTags: true,
      matchTags: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    });
  }

  return (
    <CodeMirror
      editorDidMount={editor => { onEditorDidMount(editor) }}
      autoCursor={false}
      onChange={props.onChange}
      value={props.value}
      options={options}
      onKeyPress={onKeyPress}
    />
  );

}