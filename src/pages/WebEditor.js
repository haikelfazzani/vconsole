import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Editor from '../components/Editor';

import Split from 'react-split';
import '../styles/WebEditor.css';

let local = localStorage.getItem('reacto-web-editor');
let initTabState = local ? JSON.parse(local) : {
  tabs: [
    { name: 'index.html', lang: 'htmlmixed', index: 0, code: '' },
    { name: 'style.css', lang: 'css', index: 1, code: '' },
    { name: 'app.js', lang: 'javascript', index: 2, code: '' }
  ],
  activeTabIndex: 0
};

let initEditorVal = initTabState.tabs[initTabState.activeTabIndex].code;

function writeContent (html, css, js) {
  return `<html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reacto - Online web editor</title>
      <style>
      body {
        color: #fff;
      }
      ${css}</style>
    </head>
    <body>        
      ${html}
      <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
      <script type="text/javascript" defer>${js}</script>
    </body>
  </html>`
};

export default function WebEditor () {

  const iframe = useRef();
  const [editorVal, setEditorVal] = useState(initEditorVal);
  const [tabsState, setTabsState] = useState(initTabState);
  const [isTypin, setIsTypin] = useState(false);

  const onEditorChange = (editor, value, data) => {
    setIsTypin(true);
    setEditorVal(data);
    tabsState.tabs.find(t => t.index === tabsState.activeTabIndex).code = editorVal;

    if (isTypin) {
      let iframeDoc = iframe.current.contentWindow.document;
      let content = writeContent(tabsState.tabs[0].code, tabsState.tabs[1].code, tabsState.tabs[2].code);
      iframeDoc.open().write(content);
      iframeDoc.close();
    }

    localStorage.setItem('reacto-web-editor', JSON.stringify(tabsState));
  }

  const onClickTab = (activeTabIndex) => {
    let tab = tabsState.tabs[activeTabIndex];
    setEditorVal(tab.code);
    setIsTypin(false)
    setTabsState({ ...tabsState, activeTabIndex });
  }

  return <>
    <nav className="cs-header">
      <div className="w-100 d-flex flex-column align-items-center">
        <Link to="/"><i className="fas fa-home py-3" data-toggle="tooltip"
          data-placement="top" title="Back Home"></i></Link>

        <Link to="/react-playground" className="nav-link"><i className="fab fa-react" data-toggle="tooltip" data-placement="top" title="React playground"></i></Link>

        <Link to="/js-console" className="nav-link" data-toggle="tooltip" data-placement="top" title="Javascript console">
          <i className="fas fa-terminal"></i>
        </Link>
      </div>
    </nav>

    <main>

      <header className="tabs overflow-auto">
        <ul>
          {tabsState.tabs.map(tab => (
            <li className={'tab ' + (tabsState.activeTabIndex === tab.index ? 'active-tab' : '')} key={'wtab' + tab.index}>
              <div onClick={() => { onClickTab(tab.index); }} className="mr-2">{tab.name}</div>
            </li>
          ))}
        </ul>
      </header>

      <Split gutterSize={7} sizes={[50, 50]}>
        <Editor
          onChange={onEditorChange}
          value={editorVal}
          lang={tabsState.tabs[tabsState.activeTabIndex].lang}
        />

        <iframe ref={iframe} title="web editor" className="h-100"></iframe>
      </Split>
    </main>
  </>;
}