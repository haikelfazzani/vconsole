import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import LocalData from '../util/LocalData';
import UrlShortnerService from '../services/UrlShortnerService';

import '../styles/Navbar.css';

// it's a Navbar left (sidefiles) for React playground
export default function Navbar ({ beautifyCode }) {

  const [code, setCode] = useState();
  const [isLinkCopied, setIsLintCopied] = useState(false);

  const downloadCode = useCallback(() => {
    const dType = 'data:text/plain;charset=utf-8,';
    let codeResult = LocalData.getTabs().reduce((a, c) => c.code + '\n' + a, '');
    setCode(dType + encodeURIComponent(codeResult));
  }, []);

  const onGenerateUrl = async () => {
    let codeResult = LocalData.getTabs();

    const encodedData = window.btoa(JSON.stringify(codeResult));
    let url = window.location.origin + '/r/' + encodedData;

    let shortUrl = await UrlShortnerService.getShortLink(url);

    const el = document.createElement('textarea');
    el.value = shortUrl;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setIsLintCopied(true)
  };

  useEffect(() => {
    setTimeout(() => { setIsLintCopied(false); }, 1000);
  }, [isLinkCopied, setIsLintCopied]);

  return <nav className="py-1">

    {/* <Link className="nav-link" to="/">
      <i className="fas fa-home" data-toggle="tooltip" data-placement="top" title="Back to home"></i>
    </Link> */}

    <div className="nav-link" onClick={beautifyCode}>
      <i className="fas fa-align-right" data-toggle="tooltip" data-placement="top" title="Beautify Code"></i>
    </div>

    <div className="nav-link" onClick={onGenerateUrl} data-toggle="tooltip" data-placement="top"
      title={isLinkCopied ? "Copied" : "Copy link"}>
      <i className={isLinkCopied ? "fas fa-clipboard active-copy" : "fas fa-copy"}></i>
    </div>

    <a className="nav-link" href={code} onClick={downloadCode} download={'reacto.js'}>
      <i className="fas fa-download"></i>
    </a>

    <Link to="/js-console" className="nav-link">
      <i className="fas fa-terminal" data-toggle="tooltip" data-placement="top" title="Javascript console"></i>
    </Link>

    <Link to="/snippets" className="nav-link">
      <i className="fas fa-file" data-toggle="tooltip" data-placement="top" title="Snippets"></i>
    </Link>

    <a className="nav-link" href="https://github.com/haikelfazzani/react-playground"
      target="_blank" rel="noopener noreferrer">
      <i className="fab fa-github"></i>
    </a>
  </nav>;
}