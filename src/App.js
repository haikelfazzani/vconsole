import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import Home from "./pages/Home";

import './styles/App.css';
import ReactLive from "./pages/ReactLive";

const Playground = loadable(() => import('./pages/Playground'));
const JsConsole = loadable(() => import('./pages/console/JsConsole'));

export default function App () {

  return <BrowserRouter>
    <Switch>

      <Route exact path="/" component={Home} />
      <Route exact path="/react-playground" component={Playground} />
      <Route path="/react-playground/:hook" component={Playground} />

      <Route path="/js-console" component={JsConsole} />
      <Route exact path="/console" component={JsConsole} />

      <Route exact path="/react-live" component={ReactLive} />
    </Switch>
  </BrowserRouter>;
} 