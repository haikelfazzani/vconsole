import React, { createContext, useState } from 'react';
import LocalData from '../utils/LocalData';

const GContext = createContext();

const initState = {
  preprocessor: 'javascript',
  codeEditor: LocalData.getCode(),
  fontSize: LocalData.getFontSize(),
  mode: 'ace/mode/typescript',
  theme: 'ace/theme/monokai'
};

function GlobalStore (props) {
  const [gstate, setGState] = useState(initState);
  return (<GContext.Provider value={{ gstate, setGState }}>{props.children}</GContext.Provider>);
}

export { GContext, GlobalStore };
