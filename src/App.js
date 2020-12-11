import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from "./pages/Home";

import './styles/App.css';
import './styles/Queries.css';

const ReactLive = React.lazy(() => import('./pages/ReactLive/ReactLive'));
const JsConsole = React.lazy(() => import('./pages/console/JsConsole'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));

export default function App () {

  return <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/js-console" component={JsConsole} />
        <Route path="/react-playground" component={ReactLive} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </Suspense>
  </BrowserRouter>;
} 