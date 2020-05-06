import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from "./pages/Home";
import Playground from "./pages/Playground";
import JsConsole from "./pages/JsConsole";

import './styles/App.css';

export default function App () {

  return <BrowserRouter>
    <Switch>

      <Route exact path="/" component={Home} />
      <Route exact path="/react-playground" component={Playground} />
      <Route path="/react-playground/:hook" component={Playground} />

      <Route path="/js-console" component={JsConsole} />
      <Route exact path="/console" component={JsConsole} />

      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>;
} 