import { useEffect, useRef } from "react"
import Sandbox from "../../../utils/Sandbox";

export default function Iframe() {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef && iframeRef.current) Sandbox.init();

    return () => {

    }
  }, []);

  return <iframe className='w-100 h-100' ref={iframeRef} src="" id="sandbox" title="sandbox"></iframe>
}
