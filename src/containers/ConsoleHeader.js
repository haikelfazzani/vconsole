import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalStore';
import RunCode from '../utils/RunCode';
import toJS from '../utils/toJS';

export default function ConsoleHeader() {
  const { gstate, dispatch } = useContext(GlobalContext);
  const { isRunning } = gstate;

  const onRun = async () => {
    dispatch({ type: 'isRunning', payload: { isRunning: true } });
    const code = localStorage.getItem('editorValue')
    RunCode(await toJS(code, gstate.language));
  }

  return <header className="w-100 d-flex justify-between">
    <div className="bg-dark d-flex align-center text-uppercase pl-3 pr-3 d-sm-none border-right">
      <span className="circle bg-danger"></span>
      <span className="circle bg-warning"></span>
      <span className="circle bg-green mr-3"></span>
    </div>

    <div className="h-100 d-flex">
      <button className="h-100 btn" title="Run Code" onClick={onRun} disabled={isRunning}>
        <i className="fa fa-play mr-3"></i>run
      </button>
    </div>
  </header>
}
