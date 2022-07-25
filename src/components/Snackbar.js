import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalStore';

import './Snackbar.css'

export default function Snackbar() {
  const { gstate, dispatch } = useContext(GlobalContext);

  const onClose = () => {
    dispatch({ type: 'show-snackbar', payload: { showSnackbar: false, message: '' } })
  }

  return (
    <div className={'bg-warning d-flex align-center justify-between snackbar br7 shadow' + (gstate.showSnackbar ? '' : ' d-none')}>
      <small className='text-truncate w-100 py-3 pr-3 pl-3'>
        <i className='fa fa-info-circle mr-2'></i>{gstate.message}
      </small>
      <button className='btn' onClick={onClose}><i className='fa fa-times'></i></button>
    </div>
  )
}
