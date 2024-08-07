import { useDispatch, useSelector } from "react-redux"
import { RootState, remove, updateTabName, setCurrentTab } from "../store"
import { useCallback, useState } from "react";
import Icon from "../../../components/Icon";
import { Tab } from "../../../type";
import BtnCreateNewFile from "./buttons/BtnCreateNewFile";

export default function FileExplorer() {
  const tabs = useSelector((state: RootState) => state.tabs.value) as Tab[];
  const currentTabIndex = useSelector((state: RootState) => state.tabs.currentTabIndex)
  const dispatch = useDispatch();

  const [tabName, settabName] = useState(null)

  const onTabClick = (t: Tab) => {
    dispatch(setCurrentTab(t))
  }

  const onRemoveTab = (t: Tab) => {
    if (t.index === 0) return;
    if (window.confirm('Do you really want to remove? ' + t.name)) {
      dispatch(setCurrentTab(tabs[0]))
      dispatch(remove(t.index))
    }
  }

  const onChangeTabName = useCallback((event) => {
    settabName(event.currentTarget.textContent)
  }, []);

  const onSaveTabName = () => {
    dispatch(updateTabName(tabName))
    settabName(null)
  }

  return (
    <div className="overflow small" spellCheck={false}>
      <div className="d-flex justify-between" style={{ padding: '10px' }}>
        <span>Files</span>
        <BtnCreateNewFile />
      </div>

      {tabs.map((t, i) => <div className="tab d-flex gap-1" key={i}>
        <Icon className="icon" src={t.icon} alt={t.name} />

        <div title={t.name} onClick={() => { onTabClick(t) }} onInput={onChangeTabName} contentEditable suppressContentEditableWarning>
          {t.name}
        </div>

        {tabName && t.index === currentTabIndex && <div className="tab-action" title="Save" onClick={onSaveTabName}>
          <Icon src="509215/save-alt.svg" alt="save" />
        </div>}

        {t.index !== 0 && <div className="tab-action" title="Remove" onClick={() => { onRemoveTab(t) }}>
          <Icon src="533010/trash-alt.svg" alt="trash" />
        </div>}

      </div>)}
    </div>
  )
}
