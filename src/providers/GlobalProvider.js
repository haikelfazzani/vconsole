import React, { useState } from 'react';
import GlobalContext from './GlobalContext';

/** init values global state */
let initState = {};

export default function GlobalProvider ({ children }) {
  const [state, setState] = useState(initState);
  return <GlobalContext.Provider value={{ state, setState }}>
    {children}
  </GlobalContext.Provider>;
}