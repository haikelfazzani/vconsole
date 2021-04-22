import React, { useState } from 'react';

export default function FormSaveToken () {

  const [token, setToken] = useState('');
  const [service, setService] = useState('glot');

  const onSave = e => {
    e.preventDefault();
    localStorage.setItem(service + '-token', token);
  }

  return (<form className="h-100 w-100 overflow" onSubmit={onSave}>
    <div className="form-control mb-3">
      <label>Choose a host</label>
      <select className="p-10" name="service" onChange={(e) => { setService(e.target.value) }} value={service}>
        <option value="glot">glot</option>
        <option value="dropbox">dropbox</option>
        <option value="pastebin">pastebin</option>
      </select>
    </div>

    <div className="form-control mb-5">
      <label>Enter key</label>
      <input className="p-10" type="password" name="token"
        value={token} onChange={(e) => { setToken(e.target.value) }} placeholder="token or api key" required />
    </div>

    <button type="submit" className="w-100 bg-sky-blue box-shad p-10 fw fs-16">
      <i className="fa fa-save"></i> save key
    </button>
  </form>);
}