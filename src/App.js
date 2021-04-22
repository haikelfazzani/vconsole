import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Playground from "./pages/Playground";

export default function App () {

  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Playground} />
      <Route path="/:service/:paste" component={Playground} />
      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>;
}