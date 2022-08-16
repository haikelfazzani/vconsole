import React, { useContext } from 'react';
import { GlobalContext } from '../store/GlobalStore';
import { Link } from 'react-router-dom';

function DropMenu() {
  const { dispatch } = useContext(GlobalContext);

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