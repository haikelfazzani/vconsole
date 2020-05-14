import React, { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

/** init values global state */
let initState = { fontSize: '16px' };
try {
  let local = window.localStorage ? localStorage.getItem('reacto-config') : null;
  initState = local ? JSON.parse(local) : { fontSize: '16px' };


} catch (error) {
}

function GlobalProvider ({ children }) {
  const [state, setState] = useState(initState);

  useEffect(() => {
    localStorage.setItem('reacto-config', JSON.stringify(state));
  }, [state, setState]);

  return <GlobalContext.Provider value={{ state, setState }}>
    {children}
  </GlobalContext.Provider>;
}

export { GlobalContext, GlobalProvider };