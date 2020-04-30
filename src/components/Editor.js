import React, { useState, useEffect, useContext } from 'react';
import AceEditor from "react-ace";
import GlobalContext from '../providers/GlobalContext';

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";

import "ace-builds/src-noconflict/ext-language_tools";

export default function Editor ({
  onChange, value, name = 'ace-reacto-editor', lang = 'jsx', showLineNumbers = true, readOnly = false
}) {

  const { state } = useContext(GlobalContext);
  const [options, setOptions] = useState({
    mode: lang,
    theme: 'monokai',
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    matchTags: true,
    foldGutter: true,
    readOnly,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });

  useEffect(() => {
    setOptions({ ...options, mode: lang });
  }, [lang]);

  return (<AceEditor
    mode={lang}
    theme="monokai"
    onChange={onChange}
    value={value}
    name={name}
    fontSize={state.fontSize}
    readOnly={readOnly}
    showPrintMargin={true}
    showGutter={true}
    highlightActiveLine={false}
    minLines={35}
    maxLines={35}
    width="100%"
    editorProps={{ $blockScrolling: true }}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      showLineNumbers,
      tabSize: 2,
      useWorker: false
    }}
  />);

}