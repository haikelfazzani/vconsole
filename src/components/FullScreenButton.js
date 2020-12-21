import React from 'react';

export default function FullScreenButton () {

  const onFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.querySelector('main').requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  return (
    <li title="FullScreen" className="border-left plr-20 color-white" onClick={onFullScreen}>
      <i className="fa fa-compress"></i>
    </li>
  );
}