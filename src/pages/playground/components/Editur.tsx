import { Editor } from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateFile } from '../store';

export default function Editur() {
  const currentFile = useSelector((state: RootState) => state.files.currentFile)
  const dispatch = useDispatch();

  // const handleEditorWillMount = (monaco: Monaco) => {
  //   console.log('handleEditorWillMount');
    
  //   monaco.languages.registerCompletionItemProvider(['javascript', 'typescript'], {
  //     provideCompletionItems: () => {
  //       return {
  //         suggestions: [
  //           {
  //             label: 'Async Block',
  //             kind: monaco.languages.CompletionItemKind.Snippet,
  //             documentation: 'Add an async block',
  //             insertText: [
  //               '(async () => {',
  //               '\t',
  //               '})()'].join('\n'),
  //             insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
  //           },
  //         ]
  //       };
  //     }
  //   });
  // }

  const handleEditorChange = (value: string) => {
    dispatch(updateFile(value))
  }

  return <Editor
    className='w-100 h-100'
    theme='vs-dark'
    defaultLanguage={currentFile.language}
    language={currentFile.language}
    value={currentFile.code}
    onChange={handleEditorChange}

    // beforeMount={handleEditorWillMount}
    options={{ minimap: { enabled: false }, tabSize: 2 }}
  />
}
