import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { File } from '../../../type'
import Icon from '../../../components/Icon'

export default function EditorFileTitle() {
  const currentFile: File = useSelector((state: RootState) => state.files.currentFile)

  return (
    <div className='d-flex align-center gap-1' style={{ paddingLeft: '15px' }}>
      <Icon className='icon' src={currentFile.icon} alt={currentFile.name} />
      {currentFile.name}
    </div>
  )
}
