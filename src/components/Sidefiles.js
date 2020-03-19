import React, { useState, useContext } from 'react';
import '../styles/Sidefiles.css';
import LocalData from '../util/LocalData';
import GlobalContext from '../providers/GlobalContext';

function Sidefiles () {

  const [savedCodes, setSavedCodes] = useState(LocalData.getSavedCodes());
  const { state, setState } = useContext(GlobalContext);
  const [sideHidden, setSideHidden] = useState(true);

  const replaceCurrCode = (file) => {
    setState({ ...state, currCode: file.code });
  }

  const removeOne = (fileDate) => {
    let oldSavedCodes = LocalData.removeOneSavedCode(fileDate);
    setSavedCodes(oldSavedCodes);
  }

  const onHideSideFiles = () => { setSideHidden(!sideHidden) }

  return (<div className="side-files" style={{ right: sideHidden ? '-220px' : '0' }}>

    <div onClick={onHideSideFiles} className="close-side-files">
    <i className="fas fa-outdent"></i>
    </div>

    <ul className="list-group list-group-flush w-100">

      <li className="list-group-item active" onClick={onHideSideFiles}>
        <i className="fas fa-folder-open"></i> Last saved code
      </li>

      {savedCodes.map((file, i) => <li className="list-group-item d-flex" key={'date' + i}>
        <span onClick={() => { replaceCurrCode(file); }} className="mr-2">
          <i className="fa fa-file-code"></i> {file.date}
        </span>
        <button className="btn btn-danger" onClick={() => { removeOne(file.date) }}>
          <i className="fa fa-trash"></i>
        </button>
      </li>)}

    </ul>

  </div>);
}

export default React.memo(Sidefiles);