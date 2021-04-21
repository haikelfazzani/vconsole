import React from 'react';
import { Link } from 'react-router-dom';

export default function Home () {

  return (<main>
    <h1>Vconsole</h1>
    <Link className="btn bg-dark" to="/playground">Playground</Link>
  </main>);
}