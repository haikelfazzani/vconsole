import React, { useState, useEffect } from 'react';

const Linter = ({ jsValue, language }) => {

  const [jsHintErrors, setJsHintErrors] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && language.startsWith('java')) {
      window.JSHINT(jsValue, { asi: true, lastsemic: false, esnext: true });

      setJsHintErrors(window.JSHINT.errors.map(e => {
        return { reason: e.reason, line: e.line }
      }));
    }

    return () => { isMounted = false; }
  }, [jsValue]);

  return <ul className="linter">
    <li className="header"><i className="fas fa-bug"></i> Linter</li>
    {language.startsWith('java')
      && jsHintErrors.map((l, i) => <li key={'linter' + i}>
        <i className="fas fa-angle-right"></i> {'Line ' + l.line + ':'} {l.reason}
      </li>)}
  </ul>
}

export default React.memo(Linter);