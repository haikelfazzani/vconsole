import React, { useState, useEffect } from "react";
import Editor from '../components/Editor';
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import SplitPane from '../containers/SplitPane';
import Navbar from "../components/Navbar";
import LocalData from "../util/LocalData";

import '../styles/Tabs.css';

let initCode = LocalData.getFirstTabData();

export default function App (props) {

  const [editorValue, setEditorValue] = useState(initCode);
  const [codeResult, setCodeResult] = useState(initCode);

  const [currTabIndex, setCurrTabIndex] = useState(0);

  const [tab, setTab] = useState({ name: 'Main.js', code: initCode });
  const [tabs, setTabs] = useState(LocalData.getTabs());

  const onEditorChange = (editor, value, data) => {
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

  const onAddTab = () => {
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

  useEffect(() => {
    if (Object.keys(props.match.params).length > 0) {
      const decodedData = window.atob(props.match.params.url);
      const jsonTabs = JSON.parse(decodedData);
      setTabs(jsonTabs);
    }
  }, [props.match.params]);

  return <main>
    <SplitPane>
      <div className="tabs">

        <div className="w-100">
          <div className="w-100 d-flex justify-content-between align-items-center bg-blue-sky py-2 pl-2">
            <h6 className="m-0"><i className="fas fa-folder mr-2"></i><span>Files</span></h6>
            <button className="btn-plus-tab" onClick={onAddTab}>
              <i className="fas fa-plus"></i>
            </button>
          </div>

          <div className="w-100">

            {tabs.map((t, idx) => <div className={"tab " + (currTabIndex === idx ? "active-tab" : "")}
              key={'tab' + idx}>
              <span className="mr-1" onClick={() => { onChangeTab(idx) }}>
                <i className="fas fa-file-code mr-2"></i><span>{t.name}</span>
              </span>

              <span className="btn-close-tab" onClick={() => { onRemoveTab(idx) }}>
                <i className="fas fa-times-circle"></i>
              </span>
            </div>)}

          </div>
        </div>

        <Navbar />
      </div>

      <Editor onChange={onEditorChange} value={editorValue} />
      <LiveProvider code={codeResult} noInline={true}>
        <div className="code-result"> <LivePreview /><LiveError />   </div>
      </LiveProvider>
    </SplitPane>
  </main>;
} 