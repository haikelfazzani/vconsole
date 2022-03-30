import React, { createContext, useReducer } from 'react';
import addCDNToDOM from '../utils/addCDNToDOM';
import copy from '../utils/copy';

const initState = localStorage.getItem('config')
  ? JSON.parse(localStorage.getItem('config'))
  : {
    message: '',
    showSnackbar: false,
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
    case 'show-snackbar':
      return { ...state, showSnackbar: false, message: '' };

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
      const language = action.payload.language;
      addCDNToDOM(language);
      const newState = { ...state, language };
      localStorage.setItem('config', JSON.stringify(newState));
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

    case 'share-url': {
      let code = localStorage.getItem('editorValue') || '';
      code = encodeURIComponent(btoa(code));
      const url = `${window.location.href}?language=${state.language.name}&code=${code}`;
      window.location.href.replace(url)
      copy(url);

      return { ...state, message: url, showSnackbar: true }
    }

    case 'copy-output': {
      copy(localStorage.getItem('output') || '');
      return { ...state, message: 'Copied', showSnackbar: true }
    }

    case 'copy-code': {
      copy(localStorage.getItem('editorValue') || '');
      return { ...state, message: 'Copied', showSnackbar: true }
    }

    default: {
      console.log(`Unhandled action type: ${action.type}`)
      return state
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
