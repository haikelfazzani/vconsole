import React, { useState, useEffect } from 'react';
import GlobalContext from './GlobalContext';

/** init values global state */
let local = localStorage.getItem('reacto-config');
let initState = local ? JSON.parse(local) : { theme: 'mdn-like', fontSize: '14px' };

export default function GlobalProvider ({ children }) {
  const [state, setState] = useState(initState);

  useEffect(() => {
    localStorage.setItem('reacto-config', JSON.stringify(state));
  }, [state, setState]);

  return <GlobalContext.Provider value={{ state, setState }}>
    {children}
  </GlobalContext.Provider>;
}