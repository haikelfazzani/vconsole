import { Editor } from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateCurrentTabValue } from '../store';

export default function Editur() {
  const currentTab = useSelector((state: RootState) => state.tabs.currentTab)
  const dispatch = useDispatch();

  const handleEditorChange = (value: string) => {
    dispatch(updateCurrentTabValue(value))
  }
  
  return <Editor
    className='w-100 h-100'
    theme='vs-dark'
    defaultLanguage={currentTab.language}
    language={currentTab.language}
    value={currentTab.code}
    onChange={handleEditorChange}
    options={{ minimap: { enabled: false } , tabSize:2}}
  />
}
