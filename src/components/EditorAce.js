import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-emmet";

export default function EditorAce ({ onChange, value,language }) {

  const [state, setState] = useState();

  if (state) {
    state.setBehavioursEnabled(true)
    state.completers.push({
      getCompletions: function (editor, session, pos, prefix, callback) {
        var wordList = ["foo", "bar", "baz"];
        callback(null, wordList.map(function (word) {
          return {
            caption: word,
            value: word,
            meta: "static"
          };
        }));

      }
    });
  }

  return <AceEditor
    mode={language}
    theme="monokai"
    onChange={onChange}
    onLoad={editor => {
      setState(editor);
    }}
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
      showLineNumbers: true,
      tabSize: 2,
      useWorker: false,
      enableEmmet:true
    }} />
};