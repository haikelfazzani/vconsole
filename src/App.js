import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Nav from "./components/Nav";
import Home from "./pages/Home";

const Playground = lazy(() => import("./pages/Playground"));

export default function App () {

  return <BrowserRouter>
    <Nav />
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/playground" component={Playground} />

        <Redirect path="*" to="/" />
      </Switch>
    </Suspense>
  </BrowserRouter>;
}