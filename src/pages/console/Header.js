import React from 'react';
import { Link } from 'react-router-dom';
import OutLink from '../../components/OutLink';

import DomUtils from '../../util/DomUtils';
import '../../styles/Sidebar.css';

const TYPESCRIPT_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/typescript/3.9.5/typescript.min.js';

function Header ({ setLangauge, language }) {

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

  return (
    <header className="w-100 vertical-align justify-between">
      <ul className="vertical-align inline-list">

        <li className="border-right color-white"><i className="fab fa-js"></i></li>

        <li className="border-right">
          <select name="languages" onChange={onSelectLang} value={language}>
            <option value="javascript">javascript</option>
            <option value="typescript">typescript</option>
          </select>
        </li>
      </ul>


      <ul className="vertical-align inline-list">
        
        <li className="border-left">
          <Link to="/" className="link" title="React Playground">
            <i className="fab fa-react"></i>
          </Link>
        </li>

        <li title="About" className="border-left"><Link to="/about" className="link"><i className="fa fa-info-circle"></i></Link></li>
        <li title="Contact" className="border-left"><Link to="/contact" className="link"><i className="fa fa-envelope"></i></Link></li>

        <li className="border-left">
          <OutLink href="https://github.com/haikelfazzani/react-playground" icon="fab fa-github" />
        </li>

        <li onClick={onFullScreen} className="border-left plr-20 color-white"><i className="fa fa-compress"></i></li>
      </ul>

    </header>);
}

export default React.memo(Header);