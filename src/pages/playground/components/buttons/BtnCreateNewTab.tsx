import Icon from '../../../../components/Icon'
import { create } from '../../store'
import { useDispatch } from 'react-redux';

export default function BtnCreateNewTab() {
  const dispatch = useDispatch();

  const onCreateNewTab = () => {
    dispatch(create())
  }

  return (
    <button className='border-0 p-0' title="New Tab" onClick={onCreateNewTab}><Icon width={12} height={12} src="532997/plus-large.svg" alt="plus" /></button>
  )
}
