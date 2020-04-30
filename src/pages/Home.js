import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.css';
import Snippets from '../containers/Snippets';

export default function Home () {

  return (
    <div className="jumbotron text-center">
      <h1 className="display-1">Reacto</h1>

      <p className="lead w-50 mx-auto m-0">Online React playground that auto-evaluates as you type.</p>
      <p>Free and open source</p>

      <div className="mb-3 w-20 d-flex justify-content-around fs-35">
        <span><i className="fab fa-react"></i></span>
        <span><i className="fab fa-js"></i></span>
        <span><i className="fab fa-css3-alt"></i></span>
        <span><i className="fab fa-html5"></i></span>
      </div>

      <div className="w-40 d-flex justify-content-around">
        <Link to="/react-playground" className="btn btn-outline-warning btn-lg"><i className="fab fa-react"></i> React</Link>
        <Link to="/js-console" className="btn btn-outline-warning btn-lg"><i className="fa fa-terminal"></i> Console</Link>
        <Link to="/web-editor" className="btn btn-outline-warning btn-lg"><i className="fab fa-html5"></i> Web Editor</Link>
      </div>

      <Snippets />
    </div>
  );
}