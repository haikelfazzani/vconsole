import React, { useState, useContext, useEffect } from "react";
import './styles/App.css';
import { ControlledEditor } from '@monaco-editor/react';
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import SplitPane from './components/SplitPane';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import GlobalContext from "./providers/GlobalContext";
import LocalData from "./util/LocalData";
import Sidefiles from "./components/Sidefiles";

export default function App () {

  const { state, setState } = useContext(GlobalContext);
  const [editorValue, setEditorValue] = useState(state.currCode);

  const onChange = (v, value) => {
    setEditorValue(value);
    LocalData.saveLastCode(value);
  }

  useEffect(()=>{
    setEditorValue(state.currCode);
  },[state.currCode]);

  return <main>

    <Navbar />

    <Sidefiles />

    <SplitPane>
      <ControlledEditor
        height="90vh"
        language="javascript"
        theme='vs-dark'
        onChange={onChange}
        value={editorValue}
        options={{
          fontSize: state.fontSize
        }}
      />
      <LiveProvider code={editorValue} noInline={true}>
        <div className="code-result">
          <LivePreview style={{ fontSize: state.fontSize }} /><LiveError style={{ fontSize: state.fontSize }} />
        </div>
      </LiveProvider>
    </SplitPane>

    <Footer />
  </main>;
} 