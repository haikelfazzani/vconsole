import React from 'react';

export default function Button ({ onClick, icon, toolTip }) {
  return <button className="btn btn-primary mr-2"
    onClick={onClick}
    data-toggle="tooltip"
    data-placement="top"
    title={toolTip}>
    <i className={icon}></i>
  </button>
}