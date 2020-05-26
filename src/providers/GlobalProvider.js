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
  const [globalState, setGlobalState] = useState(initState);

  useEffect(() => {
    localStorage.setItem('reacto-config', JSON.stringify(globalState));
  }, [globalState, setGlobalState]);

  return <GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>;
}

export { GlobalContext, GlobalProvider };