import React, { useContext, Suspense, useState, useCallback } from 'react';
// import { Link } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalStore';
import Languages from '../utils/Languages';
import Tabs from '../utils/Tabs';
import download from '../utils/download';
import { toSvg } from 'html-to-image';

const DropMenu = React.lazy(() => import('./DropMenu'));
const EditorSettings = React.lazy(() => import('./EditorSettings'));

export default function OutputHeader() {
  const { gstate, dispatch } = useContext(GlobalContext);
  const { language } = gstate;

  const [isCopied, setIsCopied] = useState(false);

  const onToolBar = useCallback((actionType) => {
    if (actionType === 'to-svg') {
      document.querySelector('[data-name="vs/editor/editor.main"]').crossOrigin = 'anonymous';
      document.querySelector('.output').style.display = 'none';
      document.querySelector('.gutter').style.display = 'none';

      const node = document.querySelector('.editor');
      node.style.width = '100vw';

      toSvg(node)
        .then(function (dataUrl) {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'vconsole.svg';
          link.click();
          link.remove()
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }

    if (actionType === 'download') {
      download(Tabs.getContent(), 'App.' + gstate.language.extension);
    }

    if (actionType === 'copy') {
      setIsCopied(true)
      dispatch({ type: 'copy-code' });
    
      setTimeout(() => {
        setIsCopied(false)
      }, 2000);
    }
  }, []);

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
      {/* <Link to="/blog" className="h-100 btn"><i className="fas fa-user-graduate"></i></Link> */}

      <button className="h-100 btn" title="Download Code" onClick={() => { onToolBar('download'); }}>
        <i className="fa fa-download"></i>
      </button>

      <button className="h-100 btn" title="Copy Code" onClick={() => { onToolBar('copy') }}>
        <i className={isCopied ? "fa fa-paste green" : "fa fa-copy"}></i>
      </button>

      <button className="h-100 btn" title="To SVG" onClick={() => { onToolBar('to-svg') }}>
        <i className="fa fa-camera-retro"></i>
      </button>

      <Suspense fallback={<></>}>
        <EditorSettings />
        <DropMenu />
      </Suspense>
    </div>
  </header>
}
