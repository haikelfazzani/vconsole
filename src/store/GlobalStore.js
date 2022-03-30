import React, { createContext, useReducer } from 'react';

const initState = localStorage.getItem('config')
  ? JSON.parse(localStorage.getItem('config'))
  : {
    fontSizes: [10, 12, 14, 16, 18, 20, 22, 24],
    showAddLibModal: false,
    showInfoModal: false,
    isRunning: false,
    minimap: false,
    theme: 'vs-dark',
    fontSize: 14,
    language: { id: 1, name: 'javascript', extension: 'js', syntax: 'typescript', version: '' }
  };

document.documentElement.setAttribute('data-theme', initState.theme);

const GlobalContext = createContext();

function globalReducer(state, action) {
  switch (action.type) {
    case 'isRunning': {
      return { ...state, isRunning: action.payload.isRunning }
    }

    case 'show-add-lib-modal': {
      const newState = { ...state, showAddLibModal: !state.showAddLibModal };
      return newState
    }

    case 'show-info-modal': {
      const newState = { ...state, showInfoModal: !state.showInfoModal };
      return newState
    }

    case 'minimap': {
      const newState = { ...state, minimap: !state.minimap };
      localStorage.setItem('config', JSON.stringify(newState))
      return newState
    }

    case 'language': {
      const newState = { ...state, language: action.payload.language };
      localStorage.setItem('config', JSON.stringify(newState))
      return newState
    }

    case 'fontSize': {
      const newState = { ...state, fontSize: action.payload.fontSize };
      localStorage.setItem('config', JSON.stringify(newState))
      return newState
    }

    case 'theme': {
      const theme = state.theme === 'vs-dark' ? 'vs-light' : 'vs-dark';
      document.documentElement.setAttribute('data-theme', theme);
      const newState = { ...state, theme };
      localStorage.setItem('config', JSON.stringify(newState))
      return newState
    }

    default: {
      console.log(`Unhandled action type: ${action.type}`)
    }
  }
}

function GlobalProvider({ children }) {
  const [gstate, dispatch] = useReducer(globalReducer, initState);

  return <GlobalContext.Provider value={{ gstate, dispatch }}>
    {children}
  </GlobalContext.Provider>
}

export { GlobalContext, GlobalProvider };
