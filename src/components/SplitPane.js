import React, { useEffect } from 'react';
import Split from 'react-split';

export default function SplitPane ({ children }) {

  const onDrag = (e) => {
    let section = document.querySelector('.cs-container section');
    let editor = document.querySelector('.cs-container section div');

    let width = section.clientWidth;

    editor.style.width = width + 'px';
  }

  useEffect(() => {
    window.addEventListener('resize', (e) => {
      let section = document.querySelector('.cs-container section');
      let editor = document.querySelector('.cs-container section div');

      let width = section.clientWidth;

      editor.style.width = width + 'px';
    });
  }, []);

  return <Split split="vertical" onDrag={onDrag}>{children}</Split>;
}