import React, { useState } from 'react';

export default function AddLib() {
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
    <form className="w-100 vertical-align mb-3" onSubmit={onAdd}>

      <input className="w-100 lg" type="url" name="url"
        placeholder="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"
        required />

      <button type="submit" className="btn lg"><i className="fa fa-plus"></i></button>
    </form>

    <table>
      <thead>
        <tr>
          <th>library Name</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {libraries.map((url, i) => <tr key={i}>
          <td>{url}</td>
          <td className="text-center">
            <button type="button" className="btn text-danger" onClick={() => { onRmLib(url) }}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>);
}