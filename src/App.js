import React, { useState } from "react";
import './styles/App.css';
import { ControlledEditor } from '@monaco-editor/react';
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import SplitPane from './components/SplitPane';
import Footer from "./components/Footer";

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

  const onChange = (v, value) => {
    setEditorValue(value)
  }

  return <main>

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="https://github.com/haikelfazzani/react-playground"><i className="fab fa-react"></i> Reacto</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto"></ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/haikelfazzani/react-playground" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i></a>
          </li>
        </ul>
      </div>
    </nav>

    <SplitPane>
      <ControlledEditor
        height="90vh"
        language="javascript"
        theme='vs-dark'
        onChange={onChange}
        value={editorValue}
        options={{
          fontSize: 16
        }}
      />
      <LiveProvider code={editorValue} noInline={true}>
        <div className="code-result"><LivePreview /><LiveError /></div>
      </LiveProvider>
    </SplitPane>

    <Footer />
  </main>;
} 