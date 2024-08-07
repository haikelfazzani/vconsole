import Icon from '../../../../components/Icon'
import { create } from '../../store'
import { useDispatch } from 'react-redux';

export default function BtnCreateNewFile() {
  const dispatch = useDispatch();

  const onCreateNewFile = () => {
    dispatch(create())
  }

  return (
    <button className='border-0 p-0' title="New File" onClick={onCreateNewFile}>
      <Icon width={12} height={12} src="532997/plus-large.svg" alt="plus" />
    </button>
  )
}
