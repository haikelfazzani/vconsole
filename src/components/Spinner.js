import React from 'react';
import './Spinner.css';

export default function Spinner () {
  return <div className="spinner-container horizontal-align text-white text-uppercase">
    <div className="spinner-border mb-3" role="status"></div>
    <p className="ltsp2">Loading data</p>
  </div>;
}