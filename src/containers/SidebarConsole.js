import React from 'react';
import { Link } from 'react-router-dom';
import jsBeauty from '../util/jsBeauty';
import UrlShortnerService from '../services/UrlShortnerService';

import '../styles/Sidebar.css';
import SelectFont from './SelectFont';

function SidebarConsole ({ state, setState, editorValue, setEditorValue }) {

  const beautifyCode = () => {
    let bn = jsBeauty(editorValue);
    setEditorValue(bn);
  }

  const onCopyLink = async () => {
    setState({ ...state, isCopied: true });

    const encodedData = window.btoa(editorValue);

    let url = window.location.origin + '/js-console?cs=' + encodedData;
    let shortUrl = await UrlShortnerService.getShortLink(url);

    const el = document.createElement('textarea');
    el.value = shortUrl;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setTimeout(() => { setState({ ...state, isCopied: false }); }, 1000);
  }

  const transpileCode = () => { setState({ ...state, isTranspiled: !state.isTranspiled }) }

  return (<nav className="cs-header">
    <div className="w-100 d-flex flex-column align-items-center">
      <Link to="/"><i className="fas fa-home py-3" data-toggle="tooltip" data-placement="top" title="Back Home"></i></Link>

      <div className="nav-link" onClick={beautifyCode}>
        <i className="fas fa-align-right" data-toggle="tooltip"
          data-placement="top" title="Beautify Code"></i>
      </div>

      <div className="nav-link" onClick={onCopyLink}
        title={state.isCopied ? "Copied" : "Copy Link"}>
        <i className={state.isCopied ? "fas fa-clipboard active-copy" : "fas fa-copy"}></i>
      </div>

      <div className="nav-link" onClick={transpileCode}>
        <i className="fas fa-exchange-alt" data-toggle="tooltip"
          data-placement="top" title="Transpile Code"></i>
      </div>
    </div>

    <div className="w-100 d-flex flex-column align-items-center">

      <SelectFont />

      <Link to="/react-playground" className="nav-link"><i className="fab fa-react" data-toggle="tooltip" data-placement="top" title="React playground"></i></Link>

      <a className="nav-link fs-14" href="https://github.com/haikelfazzani/react-playground"
        target="_blank" rel="noopener noreferrer">
        <i className="fab fa-github" data-toggle="tooltip" data-placement="top" title="Repository"></i>
      </a>
    </div>
  </nav>);
}

export default React.memo(SidebarConsole);