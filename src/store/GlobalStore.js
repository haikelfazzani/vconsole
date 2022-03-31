import React, { createContext, useReducer } from 'react';
import globalReducer from './globalReducer';
import initState from './initState';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [gstate, dispatch] = useReducer(globalReducer, initState);

  return <GlobalContext.Provider value={{ gstate, dispatch }}>
    {children}
  </GlobalContext.Provider>
}

export { GlobalContext, GlobalProvider };
