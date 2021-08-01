import React from 'react';

export default function Modal ({ children, showModal, setShowModal }) {
  return (<div className={"modal p-20 vertical-align justify-center flex-wrap" + (showModal ? '' : ' d-none')}>
    <button className="btn btn-close-modal bg-transparent"
      onClick={() => { setShowModal(false) }}><i className="fa fa-times-circle"></i></button>
    <div className="bg-dark modal-content">
      {children}
    </div>
  </div>);
}