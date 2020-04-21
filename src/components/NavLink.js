import React from 'react';

export default function NavLink ({ onClick, icon, toolTip }) {
  return <div className="nav-link"
    onClick={onClick}
    data-toggle="tooltip"
    data-placement="top"
    title={toolTip}>
    <i className={icon}></i>
  </div>
}