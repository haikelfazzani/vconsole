import React, { useState } from 'react';
import logo from '../img/logo192.png';

export default function Navbar () {

  const [code, setCode] = useState();

  const downloadCode = () => {
    const dType = 'data:text/plain;charset=utf-8,';

    let codeResult = localStorage.getItem('code-result');
    codeResult = codeResult.replace('\n', '');
    setCode(dType + encodeURIComponent(codeResult));
  }

  return <nav className="navbar navbar-expand-lg navbar-light bg-light">

    <div className="navbar-brand d-flex align-items-center">
      <img src={logo} alt=".." width="40" height="40" className="d-inline-block align-top mr-2" />
      <h3 className="m-0 p-0">Reacto</h3>
    </div>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto"></ul>

      <ul className="navbar-nav">

        <li className="nav-item">
          <div className="nav-link">
            <span className="badge badge-secondary">
              <i className="fas fa-clock"></i> {new Date().toString().slice(0, 15)}
            </span>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" href={code} onClick={downloadCode} download={'reacto.js'}>
            <i className="fas fa-download"></i>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="https://github.com/haikelfazzani/react-playground"
            target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </li>
      </ul>

    </div>
  </nav>;
}