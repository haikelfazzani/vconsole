import React, { useContext } from 'react';
import GlobalContext from '../providers/GlobalContext';

export default function SelectFont () {

  const { state, setState } = useContext(GlobalContext);

  return (
    <select
      className="nav-link pr-1"
      onChange={(e) => { setState({ ...state, fontSize: e.target.value }); }}
      value={state.fontSize}
      data-toggle="tooltip"
      data-placement="top"
      title="Font Size">

      <option value="12px">12</option>
      <option value="14px">14</option>
      <option value="16px">16</option>
      <option value="18px">18</option>
      <option value="20px">20</option>
      <option value="22px">22</option>

    </select>
  );
}