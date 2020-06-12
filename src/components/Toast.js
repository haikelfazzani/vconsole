import React, { useState } from 'react';

export default function Toast ({ show, text, setshowToast }) {

  return (<div className="toast" role="alert" aria-live="assertive" aria-atomic="true"
    style={{ display: show ? 'block' : 'none' }}>
    <div className="toast-header">
      <strong className="mr-auto"><i className="fa fa-link"></i> Paste url</strong>
      <small className="text-muted">{new Date().toString().slice(0, 15)}</small>
      <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"
        onClick={() => { setshowToast(null); }}>
        <span aria-hidden="false">&times;</span>
      </button>
    </div>
    <div className="toast-body">{text}</div>
  </div>);
}