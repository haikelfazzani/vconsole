import React, { createContext, useState } from 'react';

const GContext = createContext();

const initState = localStorage.getItem('config')
  ? JSON.parse(localStorage.getItem('config'))
  : {
    editorOptions: { minimap: { enabled: false } },
    theme: 'vs-dark',
    fontSize: 14,
    language: { id: 1, name: 'javascript', extension: 'js', syntax: 'typescript', version: '' }
  };

document.documentElement.setAttribute('data-theme', initState.theme);

function GlobalStore(props) {
  const [gstate, setGState] = useState(initState);
  return (<GContext.Provider value={{ gstate, setGState }}>{props.children}</GContext.Provider>);
}

export { GContext, GlobalStore };
