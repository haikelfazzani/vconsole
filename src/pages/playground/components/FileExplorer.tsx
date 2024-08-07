import { useDispatch, useSelector } from "react-redux"
import { RootState, deleteFile, setFileName, setFile } from "../store"
import { useCallback, useState } from "react";
import Icon from "../../../components/Icon";
import { File } from "../../../type";
import BtnCreateNewFile from "./buttons/BtnCreateNewFile";

export default function FileExplorer() {
  const files = useSelector((state: RootState) => state.files.value) as File[];
  const currentFileIndex = useSelector((state: RootState) => state.files.currentFileIndex)
  const dispatch = useDispatch();

  const [tabName, settabName] = useState(null)

  const onFileClick = (t: File) => {
    dispatch(setFile(t))
  }

  const onRemoveFile = (t: File) => {
    if (t.index === 0) return;
    if (window.confirm('Do you really want to deleteFile? ' + t.name)) {
      dispatch(setFile(files[0]))
      dispatch(deleteFile(t.index))
    }
  }

  const onChangeFileName = useCallback((event) => {
    settabName(event.currentTarget.textContent)
  }, []);

  const onSaveFileName = () => {
    dispatch(setFileName(tabName))
    settabName(null)
  }

  return (
    <div className="overflow small" spellCheck={false}>
      <div className="d-flex justify-between" style={{ padding: '10px' }}>
        <span>Files</span>
        <BtnCreateNewFile />
      </div>

      {files.map((t, i) => <div className="tab d-flex gap-1" key={i}>
        <Icon className="icon" src={t.icon} alt={t.name} />

        <div title={t.name} onClick={() => { onFileClick(t) }} onInput={onChangeFileName} contentEditable suppressContentEditableWarning>
          {t.name}
        </div>

        {tabName && t.index === currentFileIndex && <div className="tab-action" title="Save" onClick={onSaveFileName}>
          <Icon src="509215/save-alt.svg" alt="save" />
        </div>}

        {t.index !== 0 && <div className="tab-action" title="Remove" onClick={() => { onRemoveFile(t) }}>
          <Icon src="533010/trash-alt.svg" alt="trash" />
        </div>}

      </div>)}
    </div>
  )
}
