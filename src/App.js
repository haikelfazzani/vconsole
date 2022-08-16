import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Playground from "./pages/Playground";
import Auth from "./pages/Auth";
import Account from "./pages/account/index";
import Login from "./pages/Login";
import About from "./pages/About";

import Snackbar from './components/Snackbar';
// import Blog from "./pages/Blog";

export default function App() {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Playground} />
      <Route path="/about" component={About} />
      {/* <Route path="/blog" component={Blog} /> */}

      <Route path="/playground" component={Playground} />
      <Route path="/auth" component={Auth} />
      <Route path="/Account" component={Account} />
      <Route path="/login" component={Login} />
      <Redirect path="*" to="/" />
    </Switch>

    <Snackbar />
  </BrowserRouter>;
}