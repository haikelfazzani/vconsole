import React, { useState } from 'react';
import { withRouter } from 'react-router';
import PasteService from '../services/PasteService';

function FormSave (props) {
  const [fields, setFields] = useState({
    service: 'glot',
    title: '',
    filename: '',
    language: 'javascript',
    api_paste_expire_date: '1H'
  });

  const [msg, setMsg] = useState(null);

  const onChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }

  const onSavePaste = async e => {
    e.preventDefault();
    try {
      const local = localStorage.getItem('editor-value');
      let content = local ? JSON.parse(local) : 'Nothing';
      let resp = await PasteService.save(fields.service, fields, content);
      props.history.push('/' + resp);
      setMsg(resp);
    } catch (error) {
      setMsg(error.message);
    }
  }

  return (<form className="h-100 w-100 overflow" onSubmit={onSavePaste}>
    <div className="form-control mb-3">
      <label>Choose a host</label>
      <select className="p-10" name="service" onChange={onChange} value={fields.service}>
        <option value="glot">glot</option>
        <option value="dropbox">dropbox</option>
        <option value="pastebin">pastebin</option>
      </select>
    </div>

    <div className="d-flex">
      <div className="w-100 form-control mb-3 mr-3">
        <label>title</label>
        <input className="p-10" type="text" name="title"
          onChange={onChange}
          value={fields.title}
          placeholder="My paste" required />
      </div>

      <div className="w-100 form-control mb-3 ml-3">
        <label>filename</label>
        <input className="p-10" type="text" name="filename"
          onChange={onChange}
          value={fields.filename}
          placeholder="App.js" required />
      </div>
    </div>

    <div className="d-flex"> <div className="w-100 form-control mb-3 mr-3">
      <label>Language</label>
      <select className="p-10" name="language" onChange={onChange} value={fields.language}>
        <option value="javascript">javascript</option>
        <option value="typescript">typescript</option>
      </select>
    </div>

      {fields.service === 'pastebin'
        && <div className="w-100 form-control mb-3 ml-3">
          <label>expire date</label>
          <select className="p-10" name="api_paste_expire_date" onChange={onChange} value={fields.api_paste_expire_date}>
            <option value="1H">1 hour</option>
            <option value="1D">1 day</option>
            <option value="1M">1 month</option>
            <option value="6M">6 month</option>
            <option value="1Y">1 year</option>
            <option value="N">never</option>
          </select>
        </div>}
    </div>

    <button type="submit" className="w-100 bg-sky-blue box-shad p-10 fw fs-16 mt-3">
      <i className="fa fa-save"></i> save paste
    </button>

    {msg && <div className="form-control mt-5">
      <label>Paste url</label>
      <input className="p-10" type="text" value={msg} readOnly />
    </div>}
  </form>);
}

export default withRouter(FormSave);