import React, { useEffect, useState } from 'react';
import SnippetService from '../services/SnippetService';
import './Sidebar.css';

function Items ({ snips }) {
  return <>{snips && snips.map((s, i) => <details key={i} className="mb-2">
    <summary className="bg-white light-shadow mb-2 cp">{s.title}</summary>
    <h5 className="p-10 bg-dark m-0">{s.title}</h5>
  </details>)}</>
}

export default function Sidebar ({ setEditorValue, aceEditor }) {

  const [show, setShow] = useState(false);
  const [snippets, setSnippets] = useState(null);

  useEffect(() => {
    SnippetService.all()
      .then(s => {
        console.log(s);
        setSnippets(s);
      });
  }, []);

  const onSnip = async snip => {
    let content = await SnippetService.rawFile(snip.url);
    aceEditor.setValue(content, 1);
    setEditorValue(content);
  }

  return (
    <nav className={"sidebar " + (show ? 'sidebar-open' : '')}>
      <div>
        <button className="sidebar__toggle" onClick={() => { setShow(!show);; }}>
          {show ? 'X' : '+'}
        </button>
      </div>

      <div className="sidebar-content">
      <summary className="bg-sky-blue"><i className="fa fa-list"></i> samples</summary>
        {snippets && snippets.map((s, i) => <details key={s.name} className="cp">

          <summary className="bg-dark cp">{s.name}</summary>

          <ul>
            {s.items.map((item, idx) => <li key={idx} onClick={() => { onSnip(item) }}>{item.title}</li>)}
          </ul>

        </details>)}
      </div>
    </nav>
  );
}