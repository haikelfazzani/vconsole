import React from 'react';

export default function Modal ({ children, showModal, setShowModal }) {
  return (<div className={"modal vertical-align justify-center flex-wrap blur" + (showModal ? '' : ' d-none')}>
    <button className="btn btn-close-modal bg-transparent"
      onClick={() => { setShowModal(false) }}><i className="fa fa-times-circle fs-22"></i></button>
    <div className="bg-dark modal-content br7 shadow">
      {children}
    </div>
  </div>);
}