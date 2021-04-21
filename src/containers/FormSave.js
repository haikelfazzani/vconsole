import React, { useState } from 'react';
import PasteService from '../services/PasteService';

export default function FormSave () {

  const local = localStorage.getItem('editor-value');

  const [fields, setFields] = useState({
    service: 'pastebin',
    api_paste_name: '',
    api_paste_format: 'javascript',
    api_paste_expire_date: '1H',
    api_paste_code: local ? JSON.parse(local) : 'Nothing',
    dropbox_token: localStorage.getItem('dropbox-token') || ''
  });

  const [msg, setMsg] = useState(null);

  const onChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }

  const onSavePaste = async e => {
    e.preventDefault();
    try {
      if (fields.service === 'dropbox' && fields.dropbox_token.length > 1) {
        localStorage.setItem('dropbox-token', fields.dropbox_token);
      }
      let resp = await PasteService.save(fields.service, fields);
      console.log(resp);
      setMsg(resp);
    } catch (error) {
      setMsg(error.message);
    }
  }

  return (<form className="h-100 w-100 overflow" onSubmit={onSavePaste}>
    <h3 className="mt-0">Form Save paste</h3>
    <div className="form-control mb-3">
      <label>Choose a host</label>
      <select className="p-10" name="service" onChange={onChange} value={fields.service}>
        <option value="pastebin">pastebin</option>
        <option value="hastebin">hastebin</option>
        <option value="dropbox">dropbox</option>
      </select>
    </div>

    <div className="form-control mb-3">
      <label>Paste name</label>
      <input className="p-10" type="text" name="api_paste_name"
        onChange={onChange}
        value={fields.api_paste_name}
        placeholder="App.js" required />
    </div>

    {fields.service !== 'dropbox' ?
      <><div className="form-control mb-3">
        <label>Language</label>
        <select className="p-10" name="api_paste_format" onChange={onChange} value={fields.api_paste_format}>
          <option value="javascript">javascript</option>
          <option value="typescript">typescript</option>
        </select>
      </div>

        <div className="form-control mb-3">
          <label>expire date</label>
          <select className="p-10" name="api_paste_expire_date" onChange={onChange} value={fields.api_paste_expire_date}>
            <option value="1H">1 hour</option>
            <option value="1D">1 day</option>
            <option value="1M">1 month</option>
            <option value="6M">6 month</option>
            <option value="1Y">1 year</option>
            <option value="N">never</option>
          </select>
        </div>
      </>

      : <div className="form-control mb-3">
        <label>dropbox token</label>
        <input className="p-10" type="text" name="dropbox_token"
          onChange={onChange}
          value={fields.dropbox_token}
          placeholder="token key" required />
      </div>}

    <button type="submit" className="w-100 box-shad bg-white p-10">
      <i className="fa fa-save"></i> save paste
    </button>

    {msg && <div className="form-control mt-5">
      <label>Paste url</label>
      <input className="p-10" type="text" value={msg} readOnly />
    </div>}
  </form>);
}