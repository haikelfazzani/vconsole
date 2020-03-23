import React, { useState } from "react";
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import SplitPane from './components/SplitPane';
import Navbar from "./components/Navbar";
import { UnControlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/mode/jsx/jsx';

import './styles/App.css';
import LocalData from "./util/LocalData";

const codeJsx = `function Button({ onClick }) {
  return <button onClick={onClick}>click</button>
}

function App() {
  const [count, setCount] = React.useState(0);
  
  const onCount = () => setCount(count + 1);
  
  return <div>
    {count} <Button onClick={onCount} />
  </div>
}

render(<App />, document.getElementById('root'))`;

export default function App () {

  const [editorValue, setEditorValue] = useState(codeJsx);
  const [codeResult, setCodeResult] = useState(codeJsx);

  const [currTabIndex, setCurrTabIndex] = useState(0);

  const [tab, setTab] = useState({ name: 'Main.js', code: codeJsx });
  const [tabs, setTabs] = useState(LocalData.getTabs());

  const onChange = (editor, value, data) => {
    setEditorValue(data);
    setTab({ ...tab, code: data });

    let localTabs = LocalData.getTabs();

    if (localTabs) {
      localTabs[currTabIndex].code = data;

      setTabs(localTabs);
      localStorage.setItem('tabs', JSON.stringify(localTabs));

      let result = localTabs.reduce((a, c) => c.code + '\n' + a, '');
      setCodeResult(result);
      localStorage.setItem('code-result', JSON.stringify(result));
    }
  }

  const addTab = () => {
    let tabName = +LocalData.getLastTabName();
    let tabIndx = LocalData.getLastTabIndex();
    setEditorValue('');

    let newTab = {
      name: `Component${tabName + 1}.js`,
      code: ''
    };

    setTab(newTab);
    setTabs([...tabs, newTab]);
    setCurrTabIndex(tabIndx + 1);
    localStorage.setItem('tabs', JSON.stringify([...tabs, newTab]));
  }

  const onChangeTab = (tabIndex) => {
    setEditorValue(tabs[tabIndex].code);
    setCurrTabIndex(tabIndex);
  }

  const onRemoveTab = (tabIndex) => {
    if (tabIndex !== 0) {
      let localTabs = LocalData.getTabs();

      let newTbs = localTabs.filter((t, index) => index !== tabIndex);

      setTabs(newTbs);
      localStorage.setItem('tabs', JSON.stringify(newTbs));

      let result = newTbs.reduce((a, c) => c.code + '\n' + a, '');
      setCodeResult(result);
      localStorage.setItem('code-result', JSON.stringify(result));
    }

    setCurrTabIndex(0);
    setEditorValue(tabs[0].code);
  }

  return <>

    <Navbar />

    <div className="tabs">
      {tabs.map((t, idx) => <div className={"tab mr-2 " + (currTabIndex === idx ? "active-tab" : "")} 
      key={'tab'+idx}>
        <span
          className="mr-1 w-75"
          onClick={() => { onChangeTab(idx) }}>
          {t.name}
        </span>

        <span className="w-25 btn-close-tab" onClick={() => { onRemoveTab(idx) }}>
          <i className="fas fa-times-circle"></i>
        </span>
      </div>)}
      <button className="btn-plus-tab" onClick={addTab}><i className="fas fa-plus"></i></button>
    </div>

    <main>
      <SplitPane>
        <CodeMirror
          autoCursor={false}
          options={{ mode: 'jsx', theme: 'mdn-like', lineNumbers: true }}
          onChange={onChange}
          value={editorValue}
        />
        <LiveProvider code={codeResult} noInline={true}>
          <div className="code-result">
            <LivePreview />
            <LiveError />
          </div>
        </LiveProvider>
      </SplitPane>

    </main>
  </>;
} 