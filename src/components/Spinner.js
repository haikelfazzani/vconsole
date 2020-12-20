import React from 'react';
import './Spinner.css';

export default function Spinner () {
  return <div className="spinner-container">
    <div className="spinner-border"></div>
    <p className="mb-0 text-center">Loading data</p>
    <p className="mt-0 text-center">Please wait a moment...</p>
  </div>;
}