import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

import "ace-builds/src-noconflict/ext-language_tools";

export default function EditorAce ({onChange, value}) {

  return <AceEditor    
    mode="javascript"
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
      showLineNumbers:true,
      tabSize: 2,
      useWorker:false
    }} />
};