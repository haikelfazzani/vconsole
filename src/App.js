import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from "./pages/Home";
import ReactEditor from "./pages/ReactEditor";
import JsConsole from "./pages/JsConsole";

import './styles/App.css';

export default function App () {

  return <BrowserRouter>
    <Switch>

      <Route exact path="/" component={Home} />
      <Route exact path="/react-playground" component={ReactEditor} />
      <Route path="/js-console" component={JsConsole} />

      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>;
} 