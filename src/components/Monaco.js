import React, { useContext } from "react";
import { ControlledEditor  } from "@monaco-editor/react";
import { GlobalContext } from "../providers/GlobalProvider";

// monaco.init().then(v=>{
//   v.editor.defineTheme('myCustomTheme', data);
  
// })


export default function Monaco ({ onEditorChange, editorVal }) {

  const { globalState } = useContext(GlobalContext);

  return (
    <ControlledEditor
      height="100%"
      width="50%"
      value={editorVal}
      onChange={onEditorChange}
      language="javascript"
      theme="vs-dark"
      options={{
        fontSize: globalState.fontSize,
        automaticLayout: true,
        minimap: { enabled: false }
      }}
    />
  );
}