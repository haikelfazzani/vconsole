import React, { useState } from "react";
import Editor from '../components/Editor';
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import Split from 'react-split';
import Sidebar from "../containers/Sidebar";

import Tabs from "./Tabs";
import jsBeauty from "../util/jsBeauty";

const example = `function Button({ onClick }) {
  return <button onClick={onClick}>click</button>
}

function App() {
  const [count, setCount] = React.useState(0);
  
  const onCount = () => setCount(count + 1);
  
  return <div>
    hello
    {count} <Button onClick={onCount} />
  </div>
}

render(<App />, document.getElementById('root'))`;
let localTabs = localStorage.getItem('reacto-tabs');
let tabs = localTabs ? JSON.parse(localTabs) : [{ name: 'App.js', code: example, index: 0 }];

export default function App () {

  const [editorState, setEditorState] = useState(tabs[0].code);
  const [result, setResult] = useState(example);

  const onEditorChange = (editor, value, data) => {
    setEditorState(data);
  }

  const beautify = () => {
    let bn = jsBeauty(editorState);
    setEditorState(bn);
  }

  return <>
    <Sidebar beautify={beautify} />
    <main>

      <Tabs editorState={editorState} setEditorState={setEditorState} setResult={setResult} />

      <Split gutterSize={7} sizes={[50, 50]}>
        <Editor onChange={onEditorChange} value={editorState} />
        <LiveProvider code={result} noInline={true}>
          <div className="code-result"> <LivePreview /><LiveError />   </div>
        </LiveProvider>
      </Split>
    </main>
  </>;
} 