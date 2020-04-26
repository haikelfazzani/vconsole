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
      <div>
        <Link to="/react-playground" className="btn btn-outline-primary btn-lg mr-3"><i className="fab fa-react"></i> React</Link>
        <Link to="/js-console" className="btn btn-outline-primary btn-lg mr-3"><i className="fa fa-terminal"></i> Console</Link>
        <Link to="/web-editor" className="btn btn-outline-primary btn-lg"><i className="fab fa-html5"></i> Web Editor</Link>
      </div>
      
      <Snippets />
    </div>
  );
}