import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Icon from '../../../../components/Icon';

export default function BtnCopy() {
  const stdin = useSelector((state: RootState) => state.editor.stdin)

  const onCopy = () => {
    navigator.clipboard.writeText(stdin);
  }

  return (
    <button title="Copy" className="border-left" onClick={onCopy}>
      <Icon src="509341/copy.svg" alt="copy" />
    </button>
  )
}
