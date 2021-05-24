import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Playground from "./pages/Playground";

export default function App () {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Playground} />
      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>;
}