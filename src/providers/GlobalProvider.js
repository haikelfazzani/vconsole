import React, { useState, useEffect } from 'react';
import GlobalContext from './GlobalContext';

/** init values global state */
let initState = { fontSize: '14px' };
try {
  let local = window.localStorage ? localStorage.getItem('reacto-config') : null;
  initState = JSON.parse(local);
} catch (error) {
}

export default function GlobalProvider ({ children }) {
  const [state, setState] = useState(initState);

  useEffect(() => {
    localStorage.setItem('reacto-config', JSON.stringify(state));
  }, [state, setState]);

  return <GlobalContext.Provider value={{ state, setState }}>
    {children}
  </GlobalContext.Provider>;
}