import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalStore';

import Languages from '../utils/Languages';
import download from '../utils/download';
import { toSvg } from 'html-to-image';

export default function OutputHeader() {
  const { gstate, dispatch } = useContext(GlobalContext);
  const { language, fontSize, fontSizes } = gstate;

  const onConfig = React.useCallback((actionType, value) => {
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
      const code = localStorage.getItem('editorValue') || '';
      download(code, 'App.' + gstate.language.extension);
    }
  }, [])

  return <header className="w-100 d-flex justify-between">
    <div className="h-100 dropdown position-relative mr-3">

      <button type="button" className="h-100 btn border-0 border-right">
        <span className='nowrap'><i className="fas fa-chevron-circle-down mr-2"></i>{language.name} {language.version}</span>
      </button>

      <ul className="dropdown-menu shadow">
        {Languages.map(lang => <li
          className="dropdown-item cp"
          key={lang.id}
          onClick={() => { dispatch({ type: 'language', payload: { language: lang } }) }}>{lang.name} {lang.version}</li>)}
      </ul>
    </div>

    <div className='d-flex'>
      <button className="btn" title="Change theme" onClick={() => { dispatch({ type: 'theme' }) }}>
        <i className="fa fa-adjust"></i>
      </button>

      <button className="h-100 btn" title="Copy output" onClick={() => { dispatch({ type: 'copy-output' }) }}><i className="fa fa-copy"></i></button>

      <div className="dropdown position-relative">
        <button type="button" className="h-100 btn nowrap"><i className="fa fa-font"></i> {fontSize}</button>
        <ul className="btn dropdown-menu shadow">
          {fontSizes.map(f => <li
            className="dropdown-item cp"
            key={f}
            onClick={() => { dispatch({ type: 'fontSize', payload: { fontSize: f } }) }}>{f}</li>)}
        </ul>
      </div>

      <div className="dropdown position-relative">
        <button type="button" className="h-100 btn"><i className="fa fa-ellipsis-v"></i></button>

        <ul className="btn dropdown-menu shadow" style={{ right: 0, left: 'auto', textAlign: 'left' }}>

          <li className="dropdown-item cp" title="Share url" onClick={() => { dispatch({ type: 'share-url' }) }}>
            <i className="fa fa-share mr-3"></i>share url
          </li>

          <li className="dropdown-item cp" title="Enable minimap" onClick={() => { dispatch({ type: 'minimap' }); }}>
            <i className="fa fa-window mr-3"></i>Enable minimap
          </li>

          <li className="dropdown-item cp" title="Add Library" onClick={() => { dispatch({ type: 'show-add-lib-modal' }); }}>
            <i className="fa fa-plus mr-3"></i>add library
          </li>

          <li><hr /></li>

          <li className="dropdown-item cp" title="Download Code" onClick={() => { onConfig('download'); }}>
            <i className="fa fa-download mr-3"></i>download code
          </li>
          <li className="dropdown-item cp" title="Copy Code" onClick={() => { dispatch({ type: 'copy-code' }) }}>
            <i className="fa fa-copy mr-3"></i>copy code
          </li>

          <li className="dropdown-item cp" title="To SVG" onClick={() => { onConfig('to-svg') }}>
            <i className="fa fa-camera-retro mr-3"></i>take snapshot
          </li>

          <li><hr /></li>

          <li className="dropdown-item cp" title="Info" onClick={() => { dispatch({ type: 'show-info-modal' }); }}>
            <i className="fa fa-info-circle mr-3"></i>info
          </li>

          <li className="dropdown-item cp">
            <a className="white" href="https://github.com/haikelfazzani/vconsole">
              <i className="fab fa-github mr-3"></i>repository
            </a>
          </li>
        </ul>
      </div>
    </div>

  </header>
}
