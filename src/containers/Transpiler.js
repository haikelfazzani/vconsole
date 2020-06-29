import React, { useEffect, useState } from 'react';
import Editor from '../components/Editor';

const BABEL_CDN = 'https://cdn.jsdelivr.net/npm/@babel/standalone@7.9.4/babel.min.js';

export default function Transpiler ({ input, codeType }) {

  const [transpiledCode, setTranspiledCode] = useState();

  useEffect(() => {
    DomUtils.createScript(BABEL_CDN, 'babel-cdn');

    let output = '';
    try {
      output = window.Babel.transform(input, {
        envName: 'production', presets: codeType === 'react' ? ['react', 'es2015'] : ['es2015']
      })
      .code;

      setTranspiledCode(output);
    } catch (error) {
      setTranspiledCode(error.message);
    }
  }, [input]);

  return <Editor value={transpiledCode} />;
}