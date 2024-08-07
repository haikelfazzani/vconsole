import { useDispatch } from 'react-redux';
import { toggle } from '../../store';
import Icon from '../../../../components/Icon';

export default function BtnToggleConsole() {
  const dispatch = useDispatch();
  return (
    <button title="Console" onClick={() => { dispatch(toggle()) }}>
      <Icon src="514087/console.svg" alt="Console" />
    </button>
  )
}
