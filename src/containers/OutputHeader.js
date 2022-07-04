import React, { useContext, Suspense, useState, useCallback } from 'react';
import { GlobalContext } from '../store/GlobalStore';
import Languages from '../utils/Languages';

const DropMenu = React.lazy(() => import('./DropMenu'));
const EditorSettings = React.lazy(() => import('./EditorSettings'));

export default function OutputHeader() {
  const { gstate, dispatch } = useContext(GlobalContext);
  const { language } = gstate;

  const [isCopied, setIsCopied] = useState(false)

  const onCopyCode = useCallback(() => {
    setIsCopied(true)
    dispatch({ type: 'copy-code' });

    setTimeout(() => {
      setIsCopied(false)
    }, 2000);
  }, [])

  return <header className="w-100 d-flex justify-between">
    <div className="h-100 dropdown position-relative mr-3">

      <button type="button" className="h-100 btn border-0 border-right">
        <span className='nowrap'><i className="fas fa-chevron-circle-down mr-2"></i>{language?.name} {language?.version}</span>
      </button>

      <ul className="dropdown-menu shadow">
        {Languages.map(lang => <li
          className="dropdown-item cp"
          key={lang.id}
          onClick={() => { dispatch({ type: 'language', payload: { language: lang } }) }}>{lang.name} {lang.version}</li>)}
      </ul>
    </div>

    <div className='d-flex'>
      <button className="h-100 btn" title="Copy Code" onClick={onCopyCode}>
        <i className={isCopied ? "fa fa-paste green" : "fa fa-copy"}></i>
      </button>

      <Suspense fallback={<></>}>
        <EditorSettings />
        <DropMenu />
      </Suspense>
    </div>
  </header>
}
