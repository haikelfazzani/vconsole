import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import EditorAce from '../../components/EditorAce';
import ErrorBoundary from './ErrorBoundary';
import Split from 'react-split';
import styled from 'styled-components';

import Prettier from '../../util/Prettier';
import downloadCode from '../../util/downloadCode';
import LocalData from '../../util/LocalData';
import OutLink from '../../components/OutLink';
import FullScreenButton from '../../components/FullScreenButton';

let babelOptions = { envName: 'production', presets: ['react', 'es2015'], babelrc: false };

export default function Playground () {

  const previewRef = useRef();
  const [editorValue, setEditorValue] = useState(LocalData.getFirstTabValue());
  const [errors, setErrors] = useState('');

  const [tabs, setTabs] = useState(LocalData.getTabs());
  const [currTab, setCurrTab] = useState(LocalData.getTabs()[0]);

  const onValueChange = (data) => {
    tabs[currTab.index].value = '' + data;
    setEditorValue(data);
    setTabs(tabs);
    LocalData.setTabs(tabs);
  }

  const onRunCode = () => {
    if (previewRef && previewRef.current) {
      try {
        let tabValues = tabs.reduce((a, tab) => a + tab.value + '\n', '');
        let result = window.Babel.transform(tabValues, babelOptions);
        let ErroB = ErrorBoundary((e) => {
          setErrors(e || e.message);
        });

        let Func = new Function('React', 'ReactDOM', 'ErrorBoundary', 'styled', result.code);
        Func(React, ReactDOM, ErroB, styled);
        setErrors('');
      } catch (err) {
        setErrors(err || err.message);
      }
    }
  }

  const onChangeTab = (tab) => {
    let tabIdx = tabs.findIndex(t => t.index === tab.index);
    setCurrTab(tab);
    setEditorValue(tabs[tabIdx].value);
  }

  const onAddTab = () => {
    let len = tabs[tabs.length - 1].index + 1;
    let newTab = { index: len, title: 'Comp' + len + '.js', value: '// Comp ' + len };

    setTabs([...tabs, newTab]);
    setCurrTab(newTab);
    setEditorValue('// Comp ' + len);
  }

  const onRemoveTab = (tab) => {
    if (tab.index !== 0) {
      let nTabs = tabs.filter(t => t.index !== tab.index && t.title !== tab.title);
      setTabs(nTabs);
      setCurrTab(tabs[0]);
      setEditorValue(tabs[0].value);
      LocalData.setTabs(tabs);
    }
  }

  const onPrettier = () => {
    const formattedCode = Prettier(editorValue);
    setEditorValue(formattedCode);
    tabs[currTab.index].value = formattedCode;
    setTabs(tabs);
  }

  const onDownload = () => {
    try {
      let tabValues = tabs.reverse().reduce((a, tab) => a + tab.value + '\n', '');
      downloadCode(tabValues, 'reacto.jsx');
    } catch (error) {

    }
  }

  return (<>
    <header className="w-100 vertical-align justify-between">
      <ul className="vertical-align inline-list">

        <li className="border-right color-white"><i className="fab fa-react"></i></li>

        {tabs.map(tab => <li className={"border-right plr-20 " + (currTab.index === tab.index ? "active-tab" : "")}
          key={tab.index}>
          <span onClick={() => { onChangeTab(tab) }}>{tab.title}</span>
          {tab.index !== 0 && <span onClick={() => { onRemoveTab(tab) }} className="ml-10 btn-rm color-muted">
            <i className="fa fa-times"></i>
          </span>}
        </li>)}

        <li onClick={() => { onAddTab() }}><i className="fa fa-plus"></i></li>
      </ul>

      <ul className="vertical-align inline-list">        
        <li title="Console" className="border-left"><Link to="/js-console" className="link"><i className="fa fa-terminal"></i></Link></li>
        <li title="About" className="border-left"><Link to="/about" className="link"><i className="fa fa-info-circle"></i></Link></li>
        <li title="Contact" className="border-left"><Link to="/contact" className="link"><i className="fa fa-envelope"></i></Link></li>

        <li className="border-left">
          <OutLink href="https://github.com/haikelfazzani/react-playground" icon="fab fa-github" />
        </li>

        <FullScreenButton />
      </ul>
    </header>

    <Split gutterSize={5} sizes={[50, 50]}>
      <div className="h-100 editor">
        <EditorAce onChange={onValueChange} value={editorValue} language="javascript" />
        <div className="menu horizontal-align">
          <button className="button btn-run fs-18 mb-10" onClick={onRunCode}>
            <i className="fa fa-play"></i>
          </button>

          <button className="button btn-run fs-18 mb-10" onClick={onPrettier}>
            <i className="fa fa-stream"></i>
          </button>

          <button className="button btn-run fs-18" onClick={onDownload}>
            <i className="fa fa-download"></i>
          </button>
        </div>
      </div>

      <Split direction="vertical" cursor="col-resize" minSize={0} gutterSize={7} sizes={[50, 50]}>
        <div id="preview" ref={previewRef}></div>
        <div className="w-100 linter">
          <p><i className="fas fa-bug"></i> Linter</p>
          <ul>
            <li className="h-100 overflow-auto">{'' + errors}</li>
          </ul>
        </div>
      </Split>
    </Split>
  </>);
}