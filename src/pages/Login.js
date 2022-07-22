import React from 'react';
import BitbucketAuthService from '../services/BitbucketAuthService';

export default function Login() {

  const onConnect = () => {
    BitbucketAuthService.connect();
  }

  return <section style={{ height: '100vh', width: '100vw' }}
    className="d-flex flex-column justify-center align-center">
    <img
      className="rounded mb-5"
      width="150"
      src="https://i.ibb.co/fvcRJvD/logo512.png"
      alt="online web editor"
      loading="lazy"
    />

    <p className="m-0">Before clicking on login button</p>
    <p className="m-0">you need an Bitbucket account</p>
    <p className="m-0">please register before.</p>

    <button className="btn border mt-5 p-3" onClick={onConnect}>
      <i className="fab fa-bitbucket mr-1"></i>Login to Bitbucket
    </button>
  </section>
}