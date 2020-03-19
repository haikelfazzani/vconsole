import React from 'react';
import '../styles/Footer.css';

export default function Footer () {
  return (<footer>
    <div></div>
    <p className="m-0">{new Date().toString().slice(0, 15)}</p>
  </footer>);
}