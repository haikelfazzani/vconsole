import React, { useContext, useState } from 'react';
import Modal from '../components/Modal';
import { GlobalContext } from '../store/GlobalStore';

export default function EditorSettings() {
  const { gstate, dispatch } = useContext(GlobalContext);
  const { editorOptions } = gstate;

  const [showSettings, setShowSettings] = useState(false);

  const onSave = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);

    payload['minimap'] = { enabled: payload['minimap'] }

    dispatch({ type: 'editor-options', payload });
    setShowSettings(!setShowSettings)
  }

  return (
    <>
      <button className="btn" title="Editor Settings" onClick={() => { setShowSettings(!showSettings) }}>
        <i className="fa fa-cog"></i>
      </button>

      <Modal showModal={showSettings} setShowModal={setShowSettings}>
        <form onSubmit={onSave}>
          <div className='mb-3'>
            <label>theme</label>
            <select className='bg-light' name='theme' defaultValue={editorOptions.theme}>
              <option value="vs-dark">dark</option>
              <option value="vs-light">light</option>
            </select>
          </div>

          <div className='mb-3'>
            <label>Enable minimap</label>
            <select className='bg-light' name='minimap' defaultValue={editorOptions.minimap.enabled}>
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>

          <div className='mb-3'>
            <label>font Size</label>
            <input className='bg-light' type="number" name='fontSize' min="2" defaultValue={editorOptions.fontSize} />
          </div>

          <div className='mb-3'>
            <label>tab size</label>
            <input className='bg-light' type="number" name='tabSize' min="2" defaultValue={editorOptions.tabSize} />
          </div>

          <button type='submit' className='w-100 btn bg-green py-2'><i className='fa fa-save mr-1'></i>Save changes</button>
        </form>
      </Modal>
    </>
  )
}
