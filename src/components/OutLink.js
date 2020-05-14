import React from 'react';

export default function OutLink ({ href, icon }) {
  return (
    <a className="btn btn-primary ml-3"
      href={href}
      target="_blank"
      rel="noopener noreferrer">
      <i className={icon}></i>
    </a>
  );
}