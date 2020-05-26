import React from 'react';
import { Link } from 'react-router-dom';
import OutLink from '../components/OutLink';
import SelectFont from './SelectFont';

import '../styles/Sidebar.css';

function SidebarConsole () {

  const onFullScreen = () => {

    if (!document.fullscreenElement) {
      document.documentElement.querySelector('.cs-container').requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

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
        <button onClick={onFullScreen} className="btn btn-primary mr-2">
          <i className="fa fa-compress"></i>
        </button>

        <SelectFont />
        <OutLink href="https://github.com/haikelfazzani/react-playground" icon="fab fa-github" />
      </div>
    </nav>);
}

export default React.memo(SidebarConsole);