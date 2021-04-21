import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Nav.css';
import logo from '../logo.png';

function Navbar () {

  const [navToggle, setNavToggle] = useState(false);

  const onNavToggle = () => {
    setNavToggle(!navToggle);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Online Javascript and Typescript playground" />
      </Link>

      <button type="button" className="btn navbar-toggler" onClick={onNavToggle}>
        <i className="fa fa-bars"></i>
      </button>

      <div className={"navbar-collapse " + (navToggle ? '' : 'd-md-none')}>
        <ul className="vertical-align">
          <li className="nav-item mr-2"><Link to="/">Home</Link></li>
          <li className="nav-item mr-2"><Link to="/playground">playground</Link></li>
        </ul>

        <ul className="vertical-align">
          <li className="nav-item mr-2"><Link to="/"><i className="fab fa-github"></i></Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);