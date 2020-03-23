import React, { useState } from 'react';

export default function Navbar () {

  const [code, setCode] = useState();

  const downloadCode = () => {
    const dType = 'data:text/plain;charset=utf-8,';

    let codeResult = localStorage.getItem('code-result');
    codeResult = codeResult.replace(/\n|\r\n/g, '');
    setCode(dType + encodeURIComponent(codeResult));
  }

  return <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="https://github.com/haikelfazzani/react-playground"><i className="fab fa-react"></i> Reacto</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto"></ul>
      

      <ul className="navbar-nav">

      <li className="nav-item">
        <a className="nav-link">
          <span className="badge badge-secondary"><i className="fas fa-clock"></i> {new Date().toString().slice(0, 15)}</span>
        </a>
      </li>

        <li className="nav-item">
          <a className="nav-link"
            href={code}
            onClick={downloadCode}
            download={'reacto.js'}>
            <i className="fas fa-download"></i></a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="https://github.com/haikelfazzani/react-playground" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i></a>
        </li>
      </ul>

    </div>
  </nav>;
}