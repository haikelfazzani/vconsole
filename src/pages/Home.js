import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.css';
import SnippetService from '../services/SnippetService';

export default function Home () {

  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    SnippetService.getSnippets().then(r => { setSnippets(r) }).catch(e => { })
  }, []);

  return (
    <div className="jumbotron text-center">
      <h1 className="display-1">Reacto</h1>

      <p className="lead w-50 mx-auto m-0">Online React playground that auto-evaluates as you type.</p>
      <p>Free and open source</p>
      <div>
        <Link to="/react-playground" className="btn btn-outline-primary btn-lg mr-3"><i className="fab fa-react"></i> Playground</Link>
        <Link to="/js-console" className="btn btn-outline-primary btn-lg"><i className="fa fa-terminal"></i> Javascript</Link>
      </div>


      <div className="w-75 mx-auto row py-5">
        {snippets.length > 0 && snippets.map(s => <div className="col-md-3 mb-3" key={s.hook}>
          <Link to={"/react-playground/" + s.hook} className="btn btn-outline-warning btn-block mb-3">
            <i className="fa fa-circle"></i> {s.hook}
          </Link>
        </div>)}
      </div>


    </div>
  );
}