import copy from '../utils/copy';
import Tabs from '../utils/Tabs';

export default function globalReducer(state, action) {
  switch (action.type) {
    case 'update-tab-index': {
      const newState = { ...state, tabIndex: action.payload.tabIndex }
      localStorage.setItem('config-2', JSON.stringify(newState))
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

    case 'editor-options': {
      if (action.payload.theme && action.payload.theme !== state.editorOptions.theme) {
        document.documentElement.setAttribute('data-theme', action.payload.theme);
      }
      const newState = { ...state, editorOptions: { ...state.editorOptions, ...action.payload } };
      localStorage.setItem('config-2', JSON.stringify(newState))
      return newState
    }

    case 'language': {
      const language = action.payload.language;
      const newState = { ...state, language };
      //loadCDN(language);
      localStorage.setItem('config-2', JSON.stringify(newState));
      return newState
    }

    case 'save-code': {
      // let code = Tabs.getContent(';') || '';
      // code = encodeURIComponent(btoa(code));
      // const url = `${window.location.href}?language=${state.language.name}&code=${code}`;
      // window.location.href.replace(url)
      // copy(url);

      // return { ...state, message: url, showSnackbar: true }
    }

    case 'copy-code': {
      copy(Tabs.getContent());
      return state
    }

    default: {
      return state
    }
  }
}