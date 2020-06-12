import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../providers/GlobalProvider';
import Select from '../components/Select';

const fontSizes = [10, 12, 14, 16, 18, 20, 22, 24];

function SelectFont () {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  const onFont = (e) => {
    setGlobalState({ ...globalState, fontSize: e.target.value });
  }

  useEffect(() => {
    let editors = Array.from(document.querySelectorAll('.CodeMirror'));
    editors.forEach(ed => {
      ed.style.fontSize = globalState.fontSize + 'px';
    });
  }, [globalState.fontSize]);

  return (<Select
    onChange={onFont}
    value={globalState.fontSize}
    toolTip="tooltip"
    data={fontSizes}
  />);
}

export default React.memo(SelectFont);