import React, { useEffect, useState } from 'react';
import '../styles/Tabs.css';
import LocalData from '../util/LocalData';
import ContentEditable from "react-contenteditable";

const Tab = ({ tab, onClickTab, onRemoveTab, onRenameTab, active }) => {

  return (
    <li className={'tab ' + (active ? 'active-tab' : '')}>
      <div onClick={() => { onClickTab(tab.index); }}
        className="mr-2">
        <ContentEditable
          html={tab.name}
          onChange={(e) => { onRenameTab(e, tab.index) }}
        />
      </div>
      <span onClick={() => { onRemoveTab(tab.index) }} className="btn-rm">x</span>
    </li>
  )
}

export default function Tabs ({ editorState, setEditorState, setResult }) {

  const [tabsState, setTabsState] = useState({
    code: '',
    tabs: LocalData.getTabs(),
    currTabIndex: 0,
    nbTabs: LocalData.getTabs().length - 1
  });

  useEffect(() => {
    tabsState.tabs.find(t => t.index === tabsState.currTabIndex).code = editorState;
    setTabsState({ ...tabsState, tabs: tabsState.tabs });

    localStorage.setItem('reacto-tabs', JSON.stringify(tabsState.tabs));

    let r = tabsState.tabs.reduce((a, c) => c.code + '\n' + a, '');
    setResult(r);
  }, [editorState, setEditorState, setResult]);

  const onAddTab = () => {
    let cnt = tabsState.nbTabs + 1;
    let tab = { name: 'Comp' + cnt + '.js', code: '', index: cnt };

    setTabsState({
      ...tabsState,
      currTabIndex: cnt,
      nbTabs: cnt,
      tabs: [...tabsState.tabs, tab],
      code: ''
    });
    setEditorState('');
  }

  const onClickTab = (tabIdx) => {
    let tab = tabsState.tabs.find(t => t.index === tabIdx);

    if (tab) {
      setTabsState({ ...tabsState, currTabIndex: tabIdx, code: tab.code });
      setEditorState(tab.code);
    }
  }

  const onRemoveTab = (tabIdx) => {
    if (tabIdx !== 0) {
      let newTabs = tabsState.tabs.filter(t => t.index !== tabIdx);
      newTabs = newTabs.map((n, i) => {
        return { ...n, index: n.index = i }
      });

      setTabsState({ ...tabsState, tabs: newTabs, currTabIndex: 0, nbTabs: newTabs.length - 1 });
      setEditorState(tabsState.tabs[0].code);
      localStorage.setItem('reacto-tabs', JSON.stringify(newTabs));
    }
  }

  const onRenameTab = (evt, tabIdx) => {
    let val = evt.target.value;
    if (val && val.length > 0) {
      tabsState.tabs.find(t => t.index === tabIdx).name = val;
      setTabsState({ ...tabsState, tabs: tabsState.tabs, currTabIndex: tabIdx });
      localStorage.setItem('reacto-tabs', JSON.stringify(tabsState.tabs));
    }
  }

  return (
    <header className="tabs overflow-auto">
      <ul>
        {tabsState.tabs.map((tab, i) => {
          return <Tab
            tab={tab}
            onClickTab={onClickTab}
            onRemoveTab={onRemoveTab}
            onRenameTab={onRenameTab}
            active={tabsState.currTabIndex === i}
            key={'tab' + i} />
        })}
      </ul>

      <button className="btn-plus ml-1" onClick={() => { onAddTab() }}><i className="fa fa-plus"></i></button>
    </header>
  );
}