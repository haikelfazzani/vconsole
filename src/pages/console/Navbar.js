import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OutLink from '../../components/OutLink';
import SelectFont from '../../containers/SelectFont';

import '../../styles/Sidebar.css';
import Select from '../../components/Select';
import downloadCode from '../../util/downloadCode';
import { savePaste } from '../../services/PasteService';
import Toast from '../../components/Toast';
import DomUtils from '../../util/DomUtils';

const TYPESCRIPT_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/typescript/3.9.5/typescript.min.js';

function Navbar ({ editorValue, setEditorValue, setLangauge, language }) {

  const [pasteUrl, setPasteUrl] = useState(null);

  const onFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.querySelector('.cs-container').requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  const onClearEditor = () => { setEditorValue(''); }

  const onSelectLang = (e) => { 
    let language = e.target.value;
    if(language === 'typescript') {
      DomUtils.createScript(TYPESCRIPT_CDN)
    }
    else {
      DomUtils.removeElement();
    }
    setLangauge(language); 
  }

  const onDownload = () => {
    downloadCode(editorValue, 'reacto.' + (language.startsWith('type') ? 'ts' : 'js'));
  }

  const onSavePaste = async () => {
    // let res = await savePaste({ code: editorValue });
    // setPasteUrl(res);
  }

  return (
    <nav className="mb-2">

      <div className="w-50 d-flex align-items-center">
        <Link className="btn btn-primary mr-2" to="/">
          <i className="fas fa-home" data-toggle="tooltip" data-placement="top" title="Back to home"></i> Home
        </Link>

        <Link to="/react-playground" className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="React Playground">
          <i className="fab fa-react"></i>
        </Link>
      </div>

      <div className="w-50 d-flex justify-content-end">
        <button onClick={onClearEditor} className="btn btn-primary mr-2">
          <i className="fa fa-trash"></i>
        </button>

        <Select data={['javascript', 'typescript']} onChange={onSelectLang} value={language} />

        <SelectFont />

        <button onClick={onSavePaste} className="btn btn-primary mr-2">
          <i className="fa fa-save"></i>
        </button>

        <button onClick={onDownload} className="btn btn-primary mr-2">
          <i className="fa fa-download"></i>
        </button>

        <button onClick={onFullScreen} className="btn btn-primary">
          <i className="fa fa-compress"></i>
        </button>
        <OutLink href="https://github.com/haikelfazzani/react-playground" icon="fab fa-github" />
      </div>

      <Toast text={pasteUrl} show={pasteUrl} setshowToast={setPasteUrl} />
    </nav>);
}

export default React.memo(Navbar);