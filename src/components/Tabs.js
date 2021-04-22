import React, { useState } from 'react';
import FormSave from '../containers/FormSave';
import FormSaveToken from '../containers/FormSaveToken';

const itabs = [
  { idx: 0, name: 'Save Paste', comp: <FormSave /> },
  { idx: 1, name: 'Save key', comp: <FormSaveToken /> }
]

export default function Tabs () {

  const [idx, setIdx] = useState(0);

  return (<div className="w-100 grid-1-2">
    <ul className="w-100 mr-3">
      {itabs.map(t => <li
        className="w-100 btn rounded-0 bg-sky-blue bordred"
        key={t.idx}
        onClick={() => { setIdx(t.idx) }}><i className="fa fa-table"></i> {t.name}</li>)}
    </ul>

    {itabs[idx].comp}
  </div>);
}