import React, { useContext, useCallback } from 'react'
import { GlobalContext } from '../store/GlobalStore';
import Tabs from '../utils/Tabs';
import download from '../utils/download';
import { toSvg } from 'html-to-image';
import { Link } from 'react-router-dom';

function DropMenu() {
  const { gstate, dispatch } = useContext(GlobalContext);

  const onConfig = useCallback((actionType) => {
    if (actionType === 'to-svg') {
      document.querySelector('[data-name="vs/editor/editor.main"]').crossOrigin = 'anonymous';
      document.querySelector('.output').style.display = 'none';
      document.querySelector('.gutter').style.display = 'none';

      const node = document.querySelector('.editor');
      node.style.width = '100vw';

      toSvg(node)
        .then(function (dataUrl) {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'vconsole.svg';
          link.click();
          link.remove()
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }

    if (actionType === 'download') {
      download(Tabs.getContent(), 'App.' + gstate.language.extension);
    }
  }, []);

  return <div className="dropdown position-relative">
    <button type="button" className="h-100 btn"><i className="fa fa-ellipsis-v"></i></button>

    <ul className="btn dropdown-menu shadow" style={{ right: 0, left: 'auto', textAlign: 'left' }}>

      <li className="dropdown-item cp" title="Account">
        <Link to="/account"><i className="fa fa-user mr-3"></i>Account</Link>
      </li>

      <li className='w-100'><hr /></li>

      <li className="dropdown-item cp" title="Save Code" onClick={() => { dispatch({ type: 'show-create-or-update-modal' }); }}>
        <i className="fa fa-save mr-3"></i>save code
      </li>

      <li className="dropdown-item cp" title="Add Library" onClick={() => { dispatch({ type: 'show-add-lib-modal' }); }}>
        <i className="fa fa-plus mr-3"></i>add library
      </li>

      <li className='w-100'><hr /></li>

      <li className="dropdown-item cp" title="Download Code" onClick={() => { onConfig('download'); }}>
        <i className="fa fa-download mr-3"></i>download code
      </li>

      <li className="dropdown-item cp" title="To SVG" onClick={() => { onConfig('to-svg') }}>
        <i className="fa fa-camera-retro mr-3"></i>take snapshot
      </li>

      <li className='w-100'><hr /></li>

      <li className="dropdown-item cp" title="Info">
        <Link to="/about"><i className="fa fa-info-circle mr-3"></i>About</Link>
      </li>

      <li className="dropdown-item cp">
        <a className="white" href="https://github.com/haikelfazzani/vconsole">
          <i className="fab fa-github mr-3"></i>repository
        </a>
      </li>

      <li className='w-100'><hr /></li>

      <li className="dropdown-item cp" title="Login">
        <Link to="/login"><i className="fa fa-sign-in-alt mr-3"></i>Login</Link>
        {/* <button><i className="fa fa-sign-out-alt mr-3"></i>logout</button> */}
      </li>

    </ul>
  </div>
}

export default DropMenu