import React from 'react';
import { Link } from 'react-router-dom';

import { useEffectReducer } from 'use-effect-reducer';
import { editorReducer, editorInitState } from '../reducers/editorReducer';
import SelectFont from './SelectFont';

import OutLink from '../components/OutLink';
import NavLink from '../components/NavLink';

import '../styles/Sidebar.css';

export default function SidebarPlayground ({ beautify }) {

  const [editorState, dispatch] = useEffectReducer(editorReducer, editorInitState);

  return <nav className="py-1">
    <div className="w-100 d-flex flex-column align-items-center">
      <Link className="nav-link" to="/">
        <i className="fas fa-home" data-toggle="tooltip" data-placement="top" title="Back to home"></i>
      </Link>

      <NavLink
        onClick={() => { beautify(); }}
        icon="fas fa-align-right"
        toolTip="Beautify Code"
      />

      <NavLink
        onClick={() => {
          dispatch('COPY_LINK');
          setTimeout(() => { dispatch('IS_COPIED'); }, 1500);
        }}
        toolTip={editorState.isCopied ? "Copied" : "Copy link"}
        icon={editorState.isCopied ? "fas fa-clipboard active-copy" : "fas fa-copy"}
      />

      <a
        className="nav-link"
        href={editorState.code}
        onClick={() => { dispatch('DOWNLOAD_CODE'); }}
        download="reacto.js"
        data-toggle="tooltip"
        data-placement="top"
        title="Download Code">
        <i className="fas fa-download"></i>
      </a>
    </div>

    <div className="w-100 d-flex flex-column align-items-center">
      <SelectFont />

      <Link to="/js-console" className="nav-link" data-toggle="tooltip" data-placement="top" title="Javascript console">
        <i className="fas fa-terminal"></i>
      </Link>

      <OutLink href="https://github.com/haikelfazzani/react-playground" icon="fab fa-github" />
    </div>
  </nav>;
}