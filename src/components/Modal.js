import React from 'react';

export default function Modal ({ children, showModal, setShowModal }) {
  return (<div className={"modal p-20 vertical-align justify-center flex-wrap" + (showModal ? '' : ' d-none')}>
    <button className="btn-close-modal bg-inherit" onClick={() => { setShowModal(false) }}>X</button>
    <div className="w-50 h-100 bg-dark box-shad scaleIn">
      {children}
    </div>
  </div>);
}