import React, { useState } from 'react';

export default function AddLib () {
  const local = localStorage.getItem('libraries');
  const [libraries, setLibraries] = useState(local ? JSON.parse(local) : []);

  const onAdd = e => {
    e.preventDefault();
    let url = e.target.elements[0].value;
    let libs = localStorage.getItem('libraries');
    libs = JSON.parse(libs) || [];
    if (!libs.find(u => u === url)) {
      libs.push(url);
      setLibraries(libs);
      localStorage.setItem('libraries', JSON.stringify(libs));
    }
  }

  const onRmLib = url => {
    let libs = JSON.parse(localStorage.getItem('libraries'));
    let nlibs = libs.filter(u => u !== url);
    setLibraries(nlibs);
    localStorage.setItem('libraries', JSON.stringify(nlibs));
  }

  return (<div>
    <form className="w-100 mb-3" onSubmit={onAdd}>
      <div className="w-100 form-control">
        <label htmlFor="url"><i className="fa fa-plus-circle"></i> Add library</label>
        <input className="w-100 lg mb-3" type="url" name="url"
          placeholder="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"
          required />
      </div>

      <button type="submit" className="w-100 btn lg mt-3"><i className="fa fa-plus"></i> add to my project</button>
    </form>

    <ul className="p-10 border-m">
      {libraries.map((url, i) => <li className="w-100 vertical-align justify-between" key={i}>
        <span>{url}</span>
        <button type="button" className="btn bg-transparent text-danger p-0" onClick={() => { onRmLib(url) }}>
          <i className="fa fa-trash"></i>
        </button>
      </li>)}
    </ul>
  </div>);
}