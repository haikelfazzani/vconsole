import React from 'react';
import './Spinner.css';

export default function Spinner({ children, text = 'Loading data' }) {
  return <div className="spinner-container horizontal-align text-white text-uppercase">
    <div className="spinner-border mb-5" role="status"></div>
    <p className="ltsp2">{text}</p>
    {children}
  </div>;
}