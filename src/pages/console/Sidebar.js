import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormPaste from './FormPaste';
import '../../Sidebar.css';

export default function Sidebar () {

  const [show, setShow] = useState(false); // show sidebar (right)

  const onShow = () => { setShow(!show); }

  return (
    <nav className={"nav " + (show ? 'nav-open' : '')}>

      <div>
        <button className="nav__toggle" onClick={onShow}>{show ? 'X' : '+'}</button>
      </div>

      <div className="sidebar-content">

        <div className="btn-group" role="group" aria-label="Basic example">
          <Link to="/" className="btn btn-primary"><i className="fa fa-home"></i></Link>
          <Link to="/react-playground" className="btn btn-primary"><i className="fab fa-react"></i></Link>
        </div>

        <FormPaste />

      </div>
    </nav>
  );
}
