import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Tab } from '../../../type'
import Icon from '../../../components/Icon'

export default function EditorFileTitle() {
  const currentTab = useSelector((state: RootState) => state.tabs.currentTab) as Tab

  return (
    <div className='d-flex align-center gap-1 small' style={{paddingLeft:'15px'}}><Icon className='icon' src={currentTab.icon} alt={currentTab.name} />{currentTab.name}</div>
  )
}
