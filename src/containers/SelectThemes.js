import React, { useContext } from 'react';
import GlobalContext from '../providers/GlobalContext';

const themes = ['mdn-like', 'material', 'monokai'];

export default function SelectThemes () {

  const { state, setState } = useContext(GlobalContext);

  const onThemeChange = (e) => {
    setState({ ...state, theme: e.target.value })
  }

  return <select className="nav-link w-10" onChange={onThemeChange}>
    {themes.map(t => <option value={t} key={t}>{t}</option>)}
  </select>;
}