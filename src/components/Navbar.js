import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

export default function Navbar () {
  return (<nav className="w-100 vertical-align">
    <div className="vertical-align justify-between container">
      <ul className="vertical-align">
        <li className="vertical-align">
          <img src={logo} className="mr-10 rounded" width="40" height="40" alt="online code editor for react and javascript console" />
          <Link to="/" className="nav-link fs-18 color-dark-orange">Reacto</Link>
        </li>
      </ul>

      <ul className="vertical-align">
        <li><Link to="/" className="nav-link mr-3"><i className="fa fa-home"></i> Home</Link></li>
        <li><Link to="/about" className="nav-link mr-3"><i className="fa fa-info-circle"></i> About</Link></li>
        <li><Link to="/contact" className="nav-link"><i className="fa fa-home"></i> Contact</Link></li>
      </ul>
    </div>
  </nav>);
}