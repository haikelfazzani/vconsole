import React from 'react';

export default function Tab ({ tabName, tabIdx, currTabIndex, onChangeTab, onRemoveTab }) {
  return <div className={"tab " + (currTabIndex === tabIdx ? "active-tab" : "")}>
    <span className="mr-1" onClick={() => { onChangeTab(tabIdx) }}>
      <i className="fas fa-file-code mr-2"></i><span>{tabName}</span>
    </span>

    <span className="btn-close-tab" onClick={() => { onRemoveTab(tabIdx) }}>
      <i className="fas fa-times-circle"></i>
    </span>
  </div>;
}