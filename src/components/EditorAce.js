import React, { useContext } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";

import "ace-builds/src-noconflict/ext-language_tools";
import { GlobalContext } from "../providers/GlobalProvider";

export default function EditorAce ({
  onChange, value, lang = 'jsx', showLineNumbers = true, readOnly = false
}) {

  const { globalState } = useContext(GlobalContext);

  return <AceEditor    
    mode={lang}
    theme="monokai"
    onChange={onChange}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
    fontSize={16}
    showPrintMargin={true}
    showGutter={true}
    highlightActiveLine={true}
    value={value}
    height="100%"
    width="100%"
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: false,
      showLineNumbers,
      readOnly,
      tabSize: 2,
      useWorker:false
    }} />
};