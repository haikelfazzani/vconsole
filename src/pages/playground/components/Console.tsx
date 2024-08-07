import { useDispatch, useSelector } from "react-redux"
import { RootState, clear, set } from "../store";
import { useCallback, useEffect } from "react";
import BtnToggleConsole from "./buttons/BtnToggleConsole";
import Icon from "../../../components/Icon";

const broadcastChannel = new BroadcastChannel('console-channel');

export default function Console() {
  const { stdout, isHiding } = useSelector((state: RootState) => state.console);
  const dispatch = useDispatch();

  console.log('render Console');

  const onMessage = useCallback((event: MessageEvent<any>) => {
    dispatch(set(event.data.result || event.data.result))
  }, [])

  useEffect(() => {
    broadcastChannel.addEventListener('message', onMessage)
    return () => {
      broadcastChannel.removeEventListener('message', onMessage)
    }
  }, []);

  if (isHiding) return <></>;

  return (
    <div className='w-100 console bg-dark'>
      <div className="w-100 control d-flex justify-between">
        <span>Console</span>
        <div className="d-flex">
          <button onClick={() => { dispatch(clear()) }}><Icon src="533010/trash-alt.svg" alt="trash" /></button>
          <BtnToggleConsole />
        </div>
      </div>
      <pre className='w-100' dangerouslySetInnerHTML={{ __html: stdout }}></pre>
    </div>
  )
}
