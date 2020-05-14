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
    <nav className="mb-2">

      <div className="w-50 d-flex align-items-center">

        <Link className="btn btn-primary mr-2" to="/">
          <i className="fas fa-home" data-toggle="tooltip" data-placement="top" title="Back to home"></i> Home
        </Link>

        <Link to="/react-playground" className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="React Playground">
          <i className="fab fa-react"></i>
        </Link>
      </div>

      <div className="w-50 d-flex justify-content-end">

        <div className="btn btn-primary mr-2" onClick={onCopyLink}
          title={state.isCopied ? "Copied" : "Copy Link"}>
          <i className={state.isCopied ? "fas fa-clipboard active-copy" : "fas fa-copy"}></i>
        </div>

        <div className="btn btn-primary mr-2" onClick={beautifyCode}>
          <i className="fas fa-align-right" data-toggle="tooltip"
            data-placement="top" title="Beautify Code"></i>
        </div>

        <div className="btn btn-primary mr-2" onClick={transpileCode}>
          <i className="fas fa-exchange-alt" data-toggle="tooltip"
            data-placement="top" title="Transpile Code"></i>
        </div>

        <SelectFont />
        <OutLink href="https://github.com/haikelfazzani/react-playground" icon="fab fa-github" />
      </div>
    </nav>);
}

export default React.memo(SidebarConsole);