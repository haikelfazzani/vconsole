import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import LocalData from '../util/LocalData';

export default function Navbar () {

  const [code, setCode] = useState();
  const [isLinkCopied, setIsLintCopied] = useState(false);

  const downloadCode = useCallback(() => {
    const dType = 'data:text/plain;charset=utf-8,';
    let codeResult = LocalData.getTabs().reduce((a, c) => c.code + '\n' + a, '');
    setCode(dType + encodeURIComponent(codeResult));
  }, []);

  const onGenerateUrl = useCallback(() => {
    let codeResult = LocalData.getTabs();

    const encodedData = window.btoa(JSON.stringify(codeResult));

    const el = document.createElement('textarea');
    el.value = 'http://localhost:3000/r/' + encodedData;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setIsLintCopied(true)
  }, []);

  useEffect(() => {
    setTimeout(() => { setIsLintCopied(false); }, 5000);
  }, [isLinkCopied, setIsLintCopied]);

  return <nav className="w-100 d-flex">

    {/* <Link className="nav-link" to="/">
      <i className="fas fa-home" data-toggle="tooltip" data-placement="top" title="Back to home"></i>
    </Link> */}

    <div className="nav-link" onClick={onGenerateUrl} data-toggle="tooltip" data-placement="top"
      title={isLinkCopied ? "Copied" : "Copy link"}>
      <i className={isLinkCopied ? "fas fa-clipboard active-copy" : "fas fa-copy"}></i>
    </div>

    <a className="nav-link" href={code} onClick={downloadCode} download={'reacto.js'}>
      <i className="fas fa-download"></i>
    </a>

    <a className="nav-link" href="https://github.com/haikelfazzani/react-playground"
      target="_blank" rel="noopener noreferrer">
      <i className="fab fa-github"></i>
    </a>

    <Link to="/js-console" className="nav-link">
      <i className="fas fa-terminal" data-toggle="tooltip" data-placement="top" title="Javascript console"></i>
    </Link>
  </nav>;
}