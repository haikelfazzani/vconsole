import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.css';
import Snippets from '../containers/Snippets';

export default function Home () {

  return (
    <div className="jumbotron text-center py-3">
      <h1 className="display-1">Reacto</h1>

      <div className="w-50 text-center mb-4">
        <p className="lead m-0">Online React playground that auto-evaluates as you type.</p>
        <p className="lead m-0">Free and open source</p>
      </div>

      <div className="w-25">
        <Link to="/react-playground" className="w-100 btn btn-outline-warning btn-lg mb-3">
          <i className="fab fa-react"></i> Playground
        </Link>
        
        <Link to="/js-console" className="w-100 btn btn-outline-warning btn-lg">
          <i className="fa fa-terminal"></i> Js Console
        </Link>
      </div>

      <Snippets />
    </div>
  );
}