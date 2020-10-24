import React, { useState } from 'react';
import { savePaste } from '../../services/PasteService';

export default function FormPaste ({ editorValue }) {

  const [pasteUrl, setPasteUrl] = useState(null);

  const onSavePaste = async (e) => {
    e.preventDefault();
    let filename = e.target.elements[0].value;
    let expire_date = e.target.elements[1].value;
    let pasteUrl = await savePaste({ code: editorValue, filename, expire_date });
    setPasteUrl(pasteUrl);
  }

  return (<>
    <hr />
    <form onSubmit={onSavePaste}>

      <div className="form-group">
        <label htmlFor="filename">Filename</label>
        <input
          type="text"
          className="form-control mb-3"
          name="filename"
          placeholder="myfile.js" required />
      </div>

      <div className="form-group">
        <label htmlFor="expire_date">expire date</label>
        <select className="form-control" name="expire_date" required>
          <option value="10M">10 minutes</option>
          <option value="1H">1 hour</option>
          <option value="1D">1 day</option>
          <option value="1W">1 week</option>
          <option value="1M">1 month</option>
          <option value="1Y">1 year</option>
        </select>
      </div>

      <small className="form-text text-muted mb-2">Paste will be saved to <a href="https://pastebin.com/">Pastebin</a> as Gest.</small>

      <button type="submit" className="w-100 btn btn-primary" disabled={pasteUrl !== null}>
        <i className="fa fa-save mr-2"></i>Save Paste
      </button>
    </form>

    {pasteUrl && <input
      type="text"
      className="form-control mt-3"
      name="filename"
      defaultValue={pasteUrl}
      readOnly />}
  </>);
}