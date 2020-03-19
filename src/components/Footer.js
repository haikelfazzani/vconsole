import React, { useContext } from 'react';
import '../styles/Footer.css';
import GlobalContext from '../providers/GlobalContext';

export default function Footer () {

  const { state, setState } = useContext(GlobalContext);

  const onFontSize = (e) => {
    setState({ ...state, fontSize: e.target.value });
  }

  return (<footer>
    <div className="d-flex"></div>
    <div className="d-flex">
      <select className="mr-2" onChange={(e) => { onFontSize(e); }}>
        <option value="14px">14</option>
        <option value="16px">16</option>
        <option value="18px">18</option>
        <option value="20px">20</option>
        <option value="22px">22</option>
      </select>
      <p className="m-0">{new Date().toString().slice(0, 15)}</p>
    </div>
  </footer>);
}