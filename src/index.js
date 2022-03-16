import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStore } from './store/GlobalStore';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './styles/index.css';
import './styles/custom.css';

import './styles/colors.css';
import './styles/text.css';
import './styles/spacing.css';
import './styles/grid.css';

import './styles/queries.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStore><App /></GlobalStore>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
