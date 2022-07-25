import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalProvider } from './store/GlobalStore';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './styles/index.css';
import './styles/dropdown.css'

import './styles/colors.css';
import './styles/text.css';
import './styles/spacing.css';
import './styles/display.css';

import './styles/queries.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
