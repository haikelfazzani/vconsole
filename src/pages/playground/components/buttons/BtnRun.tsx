import Sandbox from "../../../../utils/Sandbox";
import { useSelector } from "react-redux";
import { useCallback, useTransition } from "react";
import Icon from "../../../../components/Icon";
import { RootState } from "../../store";

export default function BtnRun() {
  const [isPending, startTransition] = useTransition()
  const files = useSelector((state: RootState) => state.files.value)

  const onRun = useCallback(() => {
    startTransition(() => {
      console.log('running');
      
      Sandbox.evaluate(files);
    })
  }, [files])

  return <button title="Run" className="d-flex gap-1" onClick={onRun} disabled={isPending}>
    <Icon src="522226/play.svg" alt="play" />Run
  </button>
}
