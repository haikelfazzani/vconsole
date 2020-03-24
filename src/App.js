import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import './styles/App.css';
import ReactEditor from "./pages/ReactEditor";
import JsConsole from "./pages/JsConsole";

export default function App () {

  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ReactEditor} />
      {/* <Route path="/react-playground" component={ReactEditor} /> */}
      <Route path="/js-console" component={JsConsole} />
      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>;
} 