import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../providers/GlobalProvider';

const fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px'];

function SelectFont () {

  const { state, setState } = useContext(GlobalContext);

  const onFont = (e) => {
    setState({ ...state, fontSize: e.target.value });
  }

  useEffect(() => {
    document.querySelector('.CodeMirror').style.fontSize = state.fontSize;
  }, [state.fontSize]);

  return (
    <select
      className="btn btn-primary"
      name="font-sizes"

      onChange={onFont}
      value={state.fontSize}

      data-toggle="tooltip"
      data-placement="top"
      title="Font Size">

      {fontSizes.map(f => <option value={f} key={f}>{f}</option>)}
    </select>
  );
}

export default React.memo(SelectFont);