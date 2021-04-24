import React, { useState } from 'react';

export default function AddLib () {

  const local = localStorage.getItem('libraries');
  const [libraries, setLibraries] = useState(local ? JSON.parse(local) : []);

  const onAdd = e => {
    e.preventDefault();
    let url = e.target.elements[0].value;
    let libs = localStorage.getItem('libraries');
    libs = JSON.parse(libs) || [];
    let isFound = libs.find(u => u === url)
    if (!isFound) {
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
      <div className="w-100 form-control mb-3 mr-3">
        <label>Add url library</label>
        <input className="p-10" type="url" name="url"
          placeholder="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"
          required />
      </div>

      <button type="submit" className="w-100 bg-sky-blue box-shad p-10 fw fs-16 mt-3">
        <i className="fa fa-plus"></i> submit
    </button>
    </form>

    <h3><i className="fa fa-list"></i> List of added libraries</h3>

    <ul>
      {libraries.map((url, i) => <li className="vertical-align justify-between" key={i}>
        <span>{url}</span>
        <button type="button" className="bg-inherit p-0" onClick={() => { onRmLib(url) }}>
          <i className="fa fa-trash"></i>
        </button>
      </li>)}
    </ul>
  </div>);
}