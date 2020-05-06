import React from 'react';
import { Link } from 'react-router-dom';
import jsBeauty from '../util/jsBeauty';
import UrlShortnerService from '../services/UrlShortnerService';

import SelectFont from './SelectFont';
import copyToClipboard from '../util/copyToClipboard';

import '../styles/Sidebar.css';
import OutLink from '../components/OutLink';

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
    copyToClipboard(shortUrl);
    if (shortUrl) { setState({ ...state, isCopied: false }); }
  }

  const transpileCode = () => { setState({ ...state, isTranspiled: !state.isTranspiled }) }

  return (
    <nav className="cs-header">
      <div className="w-100 d-flex flex-column align-items-center">
        <Link to="/"><i className="fas fa-home py-3" data-toggle="tooltip" data-placement="top" title="Back Home"></i></Link>
        <Link to="/react-playground" className="nav-link"><i className="fab fa-react" data-toggle="tooltip" data-placement="top" title="React playground"></i></Link>

      </div>

      <div className="w-100 d-flex flex-column align-items-center">

        <div className="nav-link" onClick={onCopyLink}
          title={state.isCopied ? "Copied" : "Copy Link"}>
          <i className={state.isCopied ? "fas fa-clipboard active-copy" : "fas fa-copy"}></i>
        </div>

        <div className="nav-link" onClick={beautifyCode}>
          <i className="fas fa-align-right" data-toggle="tooltip"
            data-placement="top" title="Beautify Code"></i>
        </div>

        <div className="nav-link" onClick={transpileCode}>
          <i className="fas fa-exchange-alt" data-toggle="tooltip"
            data-placement="top" title="Transpile Code"></i>
        </div>

        <SelectFont />
        <OutLink href="https://github.com/haikelfazzani/react-playground" icon="fab fa-github" />
      </div>
    </nav>);
}

export default React.memo(SidebarConsole);