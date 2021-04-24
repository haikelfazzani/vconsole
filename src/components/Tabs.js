import React, { useState } from 'react';
import AddLib from '../containers/AddLib';
import FormSave from '../containers/FormSave';
import FormSaveToken from '../containers/FormSaveToken';

const itabs = [
  { idx: 0, name: 'Add Library', comp: <AddLib /> },
  { idx: 1, name: 'Save Paste', comp: <FormSave /> },
  { idx: 2, name: 'Save key', comp: <FormSaveToken /> }
]

export default function Tabs () {

  const [idx, setIdx] = useState(0);

  return (<div className="w-100 h-100 grid-1-2">
    <ul className="w-100 tabs mr-3">
      <li className="w-100 cp bg-sky-blue"><i className="fa fa-table"></i> Menu</li>
      {itabs.map(t => <li
        className="w-100 cp"
        key={t.idx}
        onClick={() => { setIdx(t.idx) }}><i className="fa fa-table"></i> {t.name}</li>)}
    </ul>

    <div>
      <h3>{itabs[idx].name}</h3>
      {itabs[idx].comp}
    </div>
  </div>);
}