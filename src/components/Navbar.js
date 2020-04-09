import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../providers/GlobalContext';
import LocalData from '../util/LocalData';
import UrlShortnerService from '../services/UrlShortnerService';

import '../styles/Navbar.css';

// it's a Navbar left (sidefiles) for React playground
export default function Navbar ({ beautifyCode }) {

  const { state, setState } = useContext(GlobalContext);
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

    <div className="nav-link" onClick={beautifyCode} data-toggle="tooltip" data-placement="top" title="Beautify Code">
      <i className="fas fa-align-right"></i>
    </div>

    <div className="nav-link" onClick={onGenerateUrl} data-toggle="tooltip" data-placement="top"
      title={isLinkCopied ? "Copied" : "Copy link"}>
      <i className={isLinkCopied ? "fas fa-clipboard active-copy" : "fas fa-copy"}></i>
    </div>

    <a className="nav-link" href={code} onClick={downloadCode} download={'reacto.js'}
    data-toggle="tooltip" data-placement="top" title="Download Code">
      <i className="fas fa-download"></i>
    </a>

    <select className="nav-link pr-1" 
    onChange={(e) => { setState({ ...state, fontSize: e.target.value }); }} 
    value={state.fontSize}
    data-toggle="tooltip" data-placement="top" title="Font Size">
      <option value="12px">12</option>
      <option value="14px">14</option>
      <option value="16px">16</option>
      <option value="18px">18</option>
      <option value="20px">20</option>
      <option value="22px">22</option>
    </select>

    <Link to="/js-console" className="nav-link" data-toggle="tooltip" data-placement="top" title="Javascript console">
      <i className="fas fa-terminal"></i>
    </Link>

    <a className="nav-link" href="https://github.com/haikelfazzani/react-playground"
      target="_blank" rel="noopener noreferrer">
      <i className="fab fa-github"></i>
    </a>
  </nav>;
}