import { combineSlices, configureStore, createSlice } from "@reduxjs/toolkit";
import { getTabs, defaultLanguages } from "../../data";
import { Tab } from "../../type";
import getFileExtension from "../../utils/getFileExtension";

const randomNames = [
  'Unicorn', 'Robot', 'Ninja', 'Pirate', 'Dragon', 'Penguin', 'Alien', 'Wizard', 'Butterfly', 'Rainbow',
  'Shark', 'Fox', 'Koala', 'Squid', 'Jelly', 'Dinosaur', 'Mermaid', 'Octopus', 'Hamster', 'Dolphin',
  'Panda', 'Monkey', 'Owl', 'Croco', 'Kanga'
];

const TabsSlice = createSlice({
  name: 'tabs',
  initialState: { value: getTabs(), currentTabIndex: 0, currentTab: getTabs()[0] },
  reducers: {
    create: (state) => {
      const randomIndex = Math.floor(Math.random() * randomNames.length);
      const name = randomNames[randomIndex];

      const newTab = { index: Date.now(), name: `${name}.tsx`, code: '// new tab', language: 'typescript', icon: defaultLanguages[2].icon }

      state.currentTabIndex = newTab.index;
      state.currentTab = newTab;
      state.value = [...state.value, newTab];
    },
    remove: (state, action) => {
      state.value = state.value.filter((t: Tab) => t.index !== action.payload)
      localStorage.setItem('editor-file-explorer', JSON.stringify(state.value))
    },
    updateCurrentTabValue: (state, action) => {
      state.value = state.value.map((t: Tab) => {
        if (t.index === state.currentTab.index) t.code = action.payload
        return t;
      });
      localStorage.setItem('editor-file-explorer', JSON.stringify(state.value))
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload
      state.currentTabIndex = action.payload.index
    },
    updateTabName: (state, action) => {
      state.value = state.value.map((t: Tab) => {        
        const tabName = action.payload.trim();
        if (t.index === state.currentTabIndex) {
          t.name = tabName;
          t.icon = defaultLanguages.find(v => v.extensions.includes(getFileExtension(tabName))).icon;          
        }
        return t;
      });

      localStorage.setItem('editor-file-explorer', JSON.stringify(state.value))
    },
  }
});

const ConsoleSlice = createSlice({
  name: 'console',
  initialState: { stdout: '', isHiding: false },
  reducers: {
    clear: (state) => {
      state.stdout = ''
    },
    set: (state, action) => {
      state.stdout = action.payload
    },
    toggle: (state) => {
      state.isHiding = !state.isHiding
    },
  }
});

const EditorSlice = createSlice({
  name: 'editor',
  initialState: { stdin: getTabs()[0].code },
  reducers: {
    clear: (state) => {
      state.stdin = ''
    }
  }
});

export const { create, updateCurrentTabValue, remove, updateTabName, setCurrentTab } = TabsSlice.actions;
export const { clear, set, toggle } = ConsoleSlice.actions;

export const store = configureStore({ reducer: combineSlices(TabsSlice, ConsoleSlice, EditorSlice) });

export type RootState = ReturnType<typeof store.getState>
