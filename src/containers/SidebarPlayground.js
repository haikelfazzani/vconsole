import React from 'react';
import { Link } from 'react-router-dom';

import { useEffectReducer } from 'use-effect-reducer';
import { editorReducer, editorInitState } from '../reducers/editorReducer';
import SelectFont from './SelectFont';

import OutLink from '../components/OutLink';
import Button from '../components/Button';

import '../styles/Sidebar.css';

export default function SidebarPlayground ({ beautify }) {

  const [editorState, dispatch] = useEffectReducer(editorReducer, editorInitState);

  return <nav className="pr-2 pl-2 mb-2">
    <div className="w-50 d-flex align-items-center">

      <Link className="btn btn-primary mr-2" to="/">
        <i className="fas fa-home" data-toggle="tooltip" data-placement="top" title="Back to home"></i> Home
      </Link>

      <Link to="/js-console" className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Javascript console">
        <i className="fas fa-terminal"></i>
      </Link>
    </div>

    <div className="w-50 d-flex justify-content-end">

      <Button
        onClick={() => { beautify(); }}
        icon="fas fa-align-right"
        toolTip="Beautify Code"
      />

      <Button
        onClick={() => {
          dispatch('COPY_LINK');
          setTimeout(() => { dispatch('IS_COPIED'); }, 1500);
        }}
        toolTip={editorState.isCopied ? "Copied" : "Copy link"}
        icon={editorState.isCopied ? "fas fa-clipboard active-copy" : "fas fa-copy"}
      />

      <Button
        onClick={() => {
          dispatch('COPY_EMBED_CODE');
          setTimeout(() => { dispatch('IS_EMBED_COPIED'); }, 1500);
        }}
        toolTip={editorState.isEmbedCopied ? "Copied" : "Embed Iframe"}
        icon={editorState.isEmbedCopied ? "fas fa-code active-copy" : "fas fa-file-code"}
      />

      <a
        className="btn btn-primary mr-2"
        href={editorState.code}
        onClick={() => { dispatch('DOWNLOAD_CODE'); }}
        download="reacto.js"
        data-toggle="tooltip"
        data-placement="top"
        title="Download Code">
        <i className="fas fa-download"></i>
      </a>

      <SelectFont />
      <OutLink href="https://github.com/haikelfazzani/react-playground" icon="fab fa-github" />
    </div>
  </nav>;
}