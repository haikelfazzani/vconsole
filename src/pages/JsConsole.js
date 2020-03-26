import React, { useState, useEffect, useCallback } from 'react';
import Editor from '../components/Editor';
import Split from 'react-split';

import '../styles/JsConsole.css';
import { Link } from 'react-router-dom';
import jsBeauty from '../util/jsBeauty';
import Transpiler from '../containers/Transpiler';

const mydata = (editorValue) => `
<style>
  body { color: #fff; font-size: 16px; }
  #dp { margin:0; list-style:none; width:100%; padding:0; }
  #dp  li { padding:0 15px;  word-break: break-all; }
</style>

<ul id="dp"></ul>
<script>
var origLog = console.log;
var consoleBuffer = [];
var ulElement = document.getElementById('dp');

window.onerror = function (msg, url, lineNo, columnNo, error) {
  var message = [
    'Message: ' + msg ,
    '<br>Line: ' + (lineNo-31) ,
    '<br>Column: ' + columnNo ,
    '<br>Error object: ' + JSON.stringify(error)
  ].join(' ');
  ulElement.innerHTML += ('<li><pre style="color: #f58771">'+ message +'</pre></li>');
  return false;
};

console.log = function () {
  var args = Array.prototype.slice.call(arguments);
  if (consoleBuffer.length === 50) consoleBuffer.pop();
  consoleBuffer.push(args);
  origLog.apply(console, args);
};

${editorValue}

let fv = consoleBuffer.flat();
for(let i = 0; i < fv.length ;i++) {
  if (typeof fv[i] === 'object') {
    ulElement.innerHTML += '<li><pre>'+ JSON.stringify(fv[i], null, 2) +'</pre></li>';
  }
  else ulElement.innerHTML += '<li><pre style="color: #c7866e">'+ fv[i] +'</pre></li>';
}

</script>`;

export default function JsConsole (props) {

  const [editorValue, setEditorValue] = useState(() => {
    let local = localStorage.getItem('reacto-console');
    return local ? JSON.parse(local) : 'console.log("Hello world")'
  });
  const [jsHintErrors, setJsHintErrors] = useState([]);
  const [isLinkCopied, setIsLintCopied] = useState(false);

  const [state, setState] = useState({
    isTranspiled: false
  });

  const onEditorChange = (editor, value, data) => {
    setEditorValue(data);

    localStorage.setItem('reacto-console', JSON.stringify(data))

    window.JSHINT(data, { asi: true, lastsemic: false, esnext: true });

    setJsHintErrors(window.JSHINT.errors.map(e => {
      return { reason: e.reason, line: e.line }
    }));
  }

  const beautifyCode = useCallback(() => {
    let cs = JSON.parse(localStorage.getItem('reacto-console'));
    let bn = jsBeauty(cs);
    setEditorValue(bn);
  }, []);

  const onGenerateUrl = useCallback(() => {
    let codeResult = localStorage.getItem('reacto-console');

    const encodedData = window.btoa(codeResult);

    const el = document.createElement('textarea');
    el.value = window.location.origin + '/cs/' + encodedData;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setIsLintCopied(true)
  }, []);

  const transpileCode = () => { setState({ ...state, isTranspiled: !state.isTranspiled }) }

  useEffect(() => {
    if (Object.keys(props.match.params).length > 0) {
      const decodedData = window.atob(props.match.params.url);
      const jsonVal = JSON.parse(decodedData);
      setEditorValue(jsonVal);
    }
  }, [props.match.params]);

  useEffect(() => {
    setTimeout(() => { setIsLintCopied(false); }, 1000);
  }, [isLinkCopied, setIsLintCopied]);

  return <div className="w-100 h-100 cs-container">

    <header className="cs-header">
      <div className="w-100 d-flex flex-column align-items-center">

        <Link to="/"><i className="fas fa-home py-3" data-toggle="tooltip" data-placement="top" title="Back Home"></i></Link>

        <span className="btn-format mb-3" onClick={beautifyCode}>
          <i className="fas fa-align-right" data-toggle="tooltip" data-placement="top" title="Beautify Code"></i>
        </span>

        <span className="btn-format mb-3" onClick={transpileCode}>
          <i className="fas fa-exchange-alt" data-toggle="tooltip" data-placement="top" title="Transpile Code"></i>
        </span>
      </div>

      <div className="w-100 d-flex flex-column align-items-center">
        <span className="btn-format mb-3" onClick={onGenerateUrl} title={isLinkCopied ? "Copied" : "Copy Link"}>
          <i className={isLinkCopied ? "fas fa-clipboard active-copy" : "fas fa-copy"}></i>
        </span>
        <a className="nav-link fs-14" href="https://github.com/haikelfazzani/react-playground"
          target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github" data-toggle="tooltip" data-placement="top" title="Repository"></i>
        </a>
      </div>
    </header>

    <Split sizes={[50, 50]}
      minSize={0}
      gutterSize={7}
      gutterAlign="center"
      direction="horizontal"
    >
      <Editor onChange={onEditorChange} value={editorValue} />

      <div className="d-flex cs-output">
        {!state.isTranspiled
          ? <Split sizes={[50, 50]}
            minSize={0}
            gutterSize={5}
            gutterAlign="center"
            direction="vertical"
          >
            <iframe title="js-console" srcDoc={mydata(jsHintErrors.length > 0 ? '' : editorValue)}></iframe>

            <ul className="linter">
              <li className="header"><i className="fas fa-bug"></i> Linter</li>
              {jsHintErrors.map((l, i) => <li key={'linter' + i}>
                <i className="fas fa-angle-right"></i> {'Line ' + l.line + ':'} {l.reason}
              </li>)}
            </ul>
          </Split>

          : <Transpiler input={state.isTranspiled ? editorValue : ''} codeType='javascript' />}
      </div>

    </Split>
  </div>;
}