import React, { useState } from 'react';
import Editor from '../components/Editor';
import Split from 'react-split';

import '../styles/JsConsole.css';

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

export default function JsConsole () {

  const [editorValue, setEditorValue] = useState(() => {
    let local = localStorage.getItem('reacto-console');
    return local ? JSON.parse(local) : 'console.log("Hello world")'
  });
  const [jsHintErrors, setJsHintErrors] = useState([]);

  const onEditorChange = (editor, value, data) => {
    setEditorValue(data);

    localStorage.setItem('reacto-console', JSON.stringify(data))

    window.JSHINT(data, {
      asi: true, lastsemic: false, esnext: true
    });

    setJsHintErrors(window.JSHINT.errors.map(e => {
      return { reason: e.reason, line: e.line }
    }));
  }

  return <div className="w-100 h-100 cs-container">

    <Split sizes={[50, 50]}
      minSize={0}
      gutterSize={7}
      gutterAlign="center"
      direction="horizontal"
    >
      <Editor onChange={onEditorChange} value={editorValue} />

      <div className="d-flex cs-output">
        <Split sizes={[50, 50]}
          minSize={0}
          gutterSize={7}
          gutterAlign="center"
          direction="vertical"
        >
          <iframe title="js-console" srcDoc={mydata(jsHintErrors.length > 0 ? '' : editorValue)}> </iframe>
          <ul className="linter">
            <li className="header"><i className="fas fa-bug"></i> Linter</li>
            {jsHintErrors.map((l, i) => <li key={'linter' + i}>
              <i className="fas fa-angle-right"></i> {'Line: ' + l.line} {l.reason}
            </li>)}
          </ul>
        </Split>
      </div>

    </Split>


  </div>;
}