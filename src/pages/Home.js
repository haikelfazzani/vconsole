import React from 'react';
import { Link } from 'react-router-dom';

export default function Home () {
  return (
    <div class="jumbotron text-center">
      <h1 class="display-1">Reacto</h1>

      <p class="lead w-50 mx-auto m-0">Online React playground that auto-evaluates as you type.</p>
      <p>Free and open source</p>
      <div>
        <Link to="/react-playground" className="btn btn-outline-primary mr-3"><i className="fab fa-react"></i> Playground</Link>
        <Link to="/js-console" className="btn btn-outline-primary"><i className="fa fa-terminal"></i> Javascript</Link>
      </div>
    </div>
  );
}