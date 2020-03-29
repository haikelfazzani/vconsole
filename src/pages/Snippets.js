import React, { useEffect, useState } from 'react';
import Editor from '../components/Editor';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import Split from 'react-split';
import SnippetsUtil from '../util/SnippetsUtil';

import '../styles/Snippets.css';
import CsIframe from '../util/CsIframe';
import { Link } from 'react-router-dom';

const codeJsx = `
function TabItem(props) {
  return <div {...props} />;
}

function Tabs(props) {
  const [bindIndex, setBindIndex] = React.useState(props.defaultIndex);
  const changeTab = newIndex => {
    if (typeof props.onTabClick === 'function') props.onTabClick(newIndex);
    setBindIndex(newIndex);
  };
  const items = props.children.filter(item => item.type.name === 'TabItem');

  return (
    <div className="wrapper">
      <div className="tab-menu">
        {items.map(({ props: { index, label } }) => (
          <button onClick={() => changeTab(index)} className={bindIndex === index ? 'focus' : ''}>
            {label}
          </button>
        ))}
      </div>
      <div className="tab-view">
        {items.map(({ props }) => (
          <div
            {...props}
            className="tab-view_item"
            key={props.index}
            style={{ display: bindIndex === props.index ? 'block' : 'none' }}
          />
        ))}
      </div>
    </div>
  );
}

render(
  <Tabs defaultIndex="1" onTabClick={console.log}>
    <TabItem label="A" index="1">
      Lorem ipsum
    </TabItem>
    <TabItem label="B" index="2">
      Dolor sit amet
    </TabItem>
  </Tabs>,
  document.getElementById('root')
);
`;

export default function Snippets () {

  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileContent, setFileContent] = useState(codeJsx);

  const [selectFolder, setSelectFolder] = useState('js');

  const [activeFile, setActiveFile] = useState(0);

  useEffect(() => {
    SnippetsUtil.getFolders().then(r => { setFolders(r); });
  }, []);

  const onSwitchSection = (e) => {
    setSelectFolder(e.target.value);
  }

  useEffect(() => {
    SnippetsUtil.getFiles(selectFolder).then(result => {

      setFiles(result);

      SnippetsUtil.getFileContent(selectFolder + '/' + result[0])
        .then(r => {
          setFileContent(r);
        });
    });
  }, [selectFolder, setSelectFolder]);

  const onFileClick = (file, fileIdx) => {
    SnippetsUtil.getFileContent(selectFolder + '/' + file)
      .then(r => { setFileContent(r); });

    setActiveFile(fileIdx)
  }

  return (<div className="snippets">
    <header>

      <Link to="/">
        <i className="fas fa-home py-3" data-toggle="tooltip" data-placement="top" title="Back Home"></i>
      </Link>

      <select onChange={onSwitchSection}>
        {folders.length > 0 && folders.map(folder => <option value={folder} key={folder}>{folder}</option>)}
      </select>

      <ul>
        {files.length > 0 && files.map((file, idx) => <li className={activeFile === idx ? "active-file" : ""}
          key={file} onClick={() => { onFileClick(file, idx) }}>
          {SnippetsUtil.formatFileName(file)}
        </li>)}
      </ul>
    </header>

    <main>

      <Split sizes={[50, 50]}
        minSize={0}
        gutterSize={7}
        gutterAlign="center"
        direction="horizontal"
      >
        <Editor value={fileContent} />
        {selectFolder === 'react'
          ? <LiveProvider code={fileContent} noInline={true}>
            <div className="code-result"> <LivePreview /><LiveError />   </div>
          </LiveProvider>
          : <iframe title="js-console" srcDoc={CsIframe(fileContent)}></iframe>}
      </Split>

    </main>
  </div>);
}