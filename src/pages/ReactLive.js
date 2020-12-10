import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import EditorAce from '../components/EditorAce';
import Split from 'react-split';
import './ReactLive.css';

let babelOptions = { envName: 'production', presets: ['react', 'es2015'], babelrc: false };

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: { message: '', stack: '' },
    info: { componentStack: '' }
  };

  static getDerivedStateFromError = error => {
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render () {
    const { hasError, error, info } = this.state;
    return hasError
      ? <div>
        <p className="text-danger">{error.message}</p>
        <p className="text-danger">{info.componentStack}</p>
      </div>
      : <div>{this.props.children}</div>;
  }
}

let defVal = `const { useState, useRef } = React;

function Button({ onClick }) {
  return <button onClick={onClick}>click</button>;
}

function App() {
  const [count, setCount] = useState(0);

  const onCount = () => setCount(count + 1);

  return (
    <div>
      {count} <Button onClick={onCount} />
    </div>
  );
}

render(<ErrorBoundary><App /></ErrorBoundary>, document.getElementById('preview'));
`;

export default function ReactLive () {

  const previewRef = useRef();
  const [editorValue, setEditorValue] = useState(defVal);
  const [errors, setErrors] = useState('');
  const [LivePreview, setLivePreview] = useState(null);

  const onValueChange = (data) => {
    setEditorValue(data);
  }

  const onRunCode = () => {
    if (previewRef && previewRef.current) {
      try {
        let result = window.Babel.transform(editorValue, babelOptions);
        let Func = new Function('React', 'render', 'ErrorBoundary', result.code)
        let Hoc = () => Func(React, ReactDOM.render, ErrorBoundary);
        setLivePreview(Hoc);
        setErrors('');
      } catch (err) {
        setErrors(err || err.message);
      }
    }
  }

  return (<div className="w-100 h-100 react-live">

    <header>
      <button className="btn btn-dark btn-run" onClick={onRunCode}>run</button>
    </header>

    <Split gutterSize={7} sizes={[50, 50]}>
      <EditorAce onChange={onValueChange} value={editorValue} />

      <Split direction="vertical" cursor="col-resize" gutterSize={7} sizes={[50, 50]}>
        <div id="preview" ref={previewRef}>
          {LivePreview && <LivePreview />}
        </div>

        <pre>{'' + errors}</pre>
      </Split>
    </Split>
  </div>);
}