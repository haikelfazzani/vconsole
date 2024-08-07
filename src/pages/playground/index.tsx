import { Provider } from 'react-redux';
import Split from 'react-split'
import Editur from './components/Editur';
import { store } from './store';
import Console from './components/Console';
import Iframe from './components/Iframe';
import Tabs from './components/Tabs';
import BtnCopy from './components/buttons/BtnCopy';
import BtnRun from './components/buttons/BtnRun';
import BtnToggleConsole from './components/buttons/BtnToggleConsole';
import BtnDownload from './components/buttons/BtnDownload';
import BtnShare from './components/buttons/BtnShare';

import './index.css';
import EditorFileTitle from './components/EditorFileTitle';

export default function Playground() {
  console.log('render Playground');

  return (
    <div className="playground d-flex">
      <Provider store={store}>
        <Split
          className="w-100 d-flex"
          sizes={[20, 55, 55]}
          minSize={[0, 0, 0]}
          expandToMin={true}
          gutterSize={7}
        >
          <aside className='h-100 border-right'>
            <header>
              <div className="tab d-flex align-center justify-center border-0">
                <span className="circle bg-danger"></span>
                <span className="circle bg-warning"></span>
                <span className="circle bg-darkgreen"></span>
              </div>
        
            </header>
            <Tabs />
          </aside>

          <div className='editor'>
            <header>
              <EditorFileTitle />

              <div className="d-flex">
                <BtnCopy />
                <BtnRun />
              </div>
            </header>
            <div className='content'><Editur /></div>
          </div>

          <div className="h-100 preview">
            <header>
              <div></div>
              <div className="d-flex">
                <BtnToggleConsole />
                <BtnDownload />
                <BtnShare />
              </div>
            </header>

            <div className='content'>
              <Iframe />
              <Console />
            </div>
          </div>

        </Split>
      </Provider>
    </div>
  );
}
