import React, { useState, useEffect } from "react";
import Editor from '../components/Editor';
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import Split from 'react-split';
import SnippetService from "../services/SnippetService";
import SidebarPlayground from "../containers/SidebarPlayground";
import Tabs from "../containers/Tabs";

import jsBeauty from "../util/jsBeauty";
import LocalData from "../util/LocalData";

export default function Playground (props) {

  const [editorState, setEditorState] = useState(LocalData.getFirstTabCode());
  const [result, setResult] = useState(LocalData.getResult());

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      SnippetService.getSnippet(props.match.params.hook)
        .then(r => { setEditorState(r) })
        .catch(e => { })
    }

    return () => { isMounted = false; }
  }, [props.match.params.hook]);

  const onEditorChange = (e, v, data) => {
    setEditorState(data);
  }

  const beautify = () => {
    let bn = jsBeauty(editorState);
    setEditorState(bn);
  }

  return <>
    <SidebarPlayground beautify={beautify} />
    <main className="py-2 pr-2 pl-2">

      <Tabs editorState={editorState} setEditorState={setEditorState} setResult={setResult} />

      <Split gutterSize={7} sizes={[50, 50]}>
        <Editor onChange={onEditorChange} value={editorState} />
        <LiveProvider code={result} noInline={true}>
          <div className="code-result">
            <LivePreview />
            <LiveError />
          </div>
        </LiveProvider>
      </Split>
    </main>
  </>;
} 