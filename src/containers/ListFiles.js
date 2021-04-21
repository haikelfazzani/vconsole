import React, { useEffect } from 'react';
import DropboxService from "../services/DropboxService";

export default function ListFiles () {

  useEffect(()=>{
    DropboxService.files()
    .then(v=>{
      //console.log(v);
    })
  },[]);

  return (<div></div>);
}