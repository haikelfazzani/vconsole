import React from 'react';
import { Link } from 'react-router-dom';
import OutLink from '../../components/OutLink';

import downloadCode from '../../util/downloadCode';
import DomUtils from '../../util/DomUtils';
import '../../styles/Sidebar.css';

const TYPESCRIPT_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/typescript/3.9.5/typescript.min.js';

function Header ({ editorValue, setLangauge, language }) {

  const onFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.querySelector('main').requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  const onSelectLang = (e) => {
    let language = e.target.value;
    if (language === 'typescript') {
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

  return (
    <header className="w-100 vertical-align justify-between">
      <ul className="vertical-align inline-list">
        <li className="border-right">
          <Link className="link" to="/"><i className="fas fa-home" title="Back to home"></i></Link>
        </li>

        <li className="border-right">
          <Link to="/react-playground" className="link" title="React Playground">
            <i className="fab fa-react"></i>
          </Link>
        </li>
      </ul>

      <ul className="vertical-align inline-list">        
        <li className="border-left">
          <select name="languages" onChange={onSelectLang} value={language}>
            <option value="javascript">javascript</option>
            <option value="typescript">typescript</option>
          </select>
        </li>

        <li  onClick={onDownload} className="border-left plr-20"><i className="fa fa-download"></i></li>
        <li onClick={onFullScreen} className="border-left plr-20"><i className="fa fa-compress"></i></li>

        <li className="border-left">
          <OutLink href="https://github.com/haikelfazzani/react-playground" icon="fab fa-github" />
        </li>
      </ul>

    </header>);
}

export default React.memo(Header);