import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Playground from "./pages/Playground";
import Snippets from "./pages/Snippets";

export default function App () {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Playground} />
      <Route exact path="/snippets" component={Snippets} />
      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>;
}