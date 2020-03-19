import React, { useState } from 'react';
import GlobalContext from './GlobalContext';
import LocalData from '../util/LocalData';

/** init values global state */
let initState = {
  fontSize: 16,
  currCode: LocalData.getLastCode()
};

export default function GlobalProvider ({ children }) {
  const [state, setState] = useState(initState);
  return <GlobalContext.Provider value={{ state, setState }}>
    {children}
  </GlobalContext.Provider>;
}