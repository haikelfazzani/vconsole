import React, { useState, useEffect } from "react";
import Editor from '../components/Editor';
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import SplitPane from '../containers/SplitPane';
import Navbar from "../components/Navbar";
import LocalData from "../util/LocalData";

import Tab from "../components/Tab";
import '../styles/Sidebar.css';
import jsBeauty from "../util/jsBeauty";

let codeExample = LocalData.getFirstTabData();

export default function App (props) {

  const [editorValue, setEditorValue] = useState(codeExample);
  const [codeResult, setCodeResult] = useState(codeExample);

  const [currTabIndex, setCurrTabIndex] = useState(0);

  const [tab, setTab] = useState({ name: 'App.js', code: codeExample });
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

      localStorage.setItem('reacto-curr-tab-value', JSON.stringify(data));
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

  useEffect(() => {
    function beautifyCode(e) {
      if (e.ctrlKey && e.altKey && e.keyCode === 70) {
        let localVal = LocalData.getCurrTabData();
        let bn = jsBeauty(localVal);
        setEditorValue(bn);
      }
    }

    document.addEventListener('keydown', beautifyCode, false);    
    return () => document.removeEventListener('keydown', beautifyCode)
  }, []);

  return <main>
    <SplitPane>
      <div className="sidebar">

        <div className="w-100">
          <div className="w-100 d-flex justify-content-between align-items-center bg-blue-sky py-2 pl-2">
            <h6 className="m-0"><i className="fas fa-folder mr-1"></i><span>Explorer</span></h6>
            <button className="btn-plus-tab" onClick={onAddTab}>
              <i className="fas fa-plus"></i>
            </button>
          </div>

          <div className="w-100">
            {tabs.map((t, idx) => <Tab
              tabName={t.name}
              tabIdx={idx}
              currTabIndex={currTabIndex}
              onChangeTab={onChangeTab}
              onRemoveTab={onRemoveTab}
              key={'tab' + idx}
            />)}
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