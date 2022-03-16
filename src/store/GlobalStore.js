import React, { createContext, useState } from 'react';

const GContext = createContext();

const initState = localStorage.getItem('config')
  ? JSON.parse(localStorage.getItem('config'))
  : {
    fontSize: 14,
    language: { id: 1, name: 'javascript', extension: 'js', syntax: 'typescript', version: '' }
  };

function GlobalStore(props) {
  const [gstate, setGState] = useState(initState);
  return (<GContext.Provider value={{ gstate, setGState }}>{props.children}</GContext.Provider>);
}

export { GContext, GlobalStore };
