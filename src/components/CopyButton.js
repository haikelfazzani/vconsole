import React, { useState } from 'react';

export default function CopyButton ({ data }) {

  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    setIsCopied(true);
    
    const el = document.createElement('textarea');
    el.value = data;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }

  return (<button className="button btn-run fs-18 mb-10" onClick={onCopy}>
    <i className={"fa fa-" + (isCopied ? 'paste color-dark-orange' : 'copy')}></i>
  </button>);
}