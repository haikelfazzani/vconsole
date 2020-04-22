import React, { useState, useEffect } from 'react';
import SnippetService from '../services/SnippetService';
import { Link } from 'react-router-dom';

import '../styles/Animation.css';

export default function Snippets () {

  const [snippets, setSnippets] = useState([]);
  const [hideMenu, setHideMenu] = useState(true);

  useEffect(() => {
    SnippetService.getSnippets().then(r => { setSnippets(r) }).catch(e => { })
  }, []);

  return (<>
    <span className="btn-modal" onClick={() => { setHideMenu(!hideMenu) }}>
      <i className="fa fa-list"></i>
    </span>

    <ul className="menu-snippets list-group slideRight" style={{ display: hideMenu ? 'none' : 'block' }}>
      <li className="list-group-item text-uppercase ltsp">
        <i className="fab fa-react"></i> List snippets
      </li>

      {snippets.length > 0 && snippets.map(s => <li key={s.hook} className="list-group-item">
        <Link to={"/react-playground/" + s.hook}><i className="fa fa-circle"></i> {s.hook}</Link>
      </li>)}
    </ul>
  </>);
}