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
      const showSnackbar = action.payload.showSnackbar;
      const message = action.payload.message;
      return { ...state, showSnackbar, message };

    case 'isRunning': {
      return { ...state, isRunning: action.payload.isRunning }
    }

    case 'show-add-lib-modal': {
      const newState = { ...state, showAddLibModal: !state.showAddLibModal };
      return newState
    }

    case 'show-create-or-update-modal': {
      const newState = { ...state, showCreateOrUpdateModal: !state.showCreateOrUpdateModal };
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

      localStorage.setItem('config-2', JSON.stringify(newState));
      return newState
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