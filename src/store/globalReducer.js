import loadCDN from '../utils/loadCDN';
import copy from '../utils/copy';
import Tabs from '../utils/Tabs';

export default function globalReducer(state, action) {
  switch (action.type) {
    case 'update-tab-index': {
      const newState = { ...state, tabIndex: action.payload.tabIndex }
      localStorage.setItem('config', JSON.stringify(newState))
      return newState;
    }

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
      const newState = { ...state, language };
      loadCDN(language);
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
      copy(Tabs.getContent());
      return { ...state, message: 'Copied', showSnackbar: true }
    }

    default: {
      return state
    }
  }
}