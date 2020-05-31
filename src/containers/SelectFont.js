import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../providers/GlobalProvider';

const fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px'];

function SelectFont () {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  const onFont = (e) => {
    setGlobalState({ ...globalState, fontSize: e.target.value });
  }

  useEffect(() => {
    let editors = Array.from(document.querySelectorAll('.CodeMirror'));
    editors.forEach(ed => {
      ed.style.fontSize = globalState.fontSize;
    });
  }, [globalState.fontSize]);

  return (
    <select
      className="btn btn-primary disp-none"
      name="font-sizes"

      onChange={onFont}
      value={globalState.fontSize}

      data-toggle="tooltip"
      data-placement="top"
      title="Font Size">

      {fontSizes.map(f => <option value={f} key={f}>{f}</option>)}
    </select>
  );
}

export default React.memo(SelectFont);