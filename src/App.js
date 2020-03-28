import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './styles/App.css';
import ReactEditor from "./pages/ReactEditor";
import JsConsole from "./pages/JsConsole";
import Snippets from "./pages/Snippets";

export default function App () {

  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ReactEditor} />
      <Route path="/r/:url" component={ReactEditor} />
      <Route path="/js-console" component={JsConsole} />
      <Route path="/cs/:url" component={JsConsole} />

      <Route path="/snippets" component={Snippets} />

      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>;
} 