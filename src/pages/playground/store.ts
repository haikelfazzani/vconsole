import { combineSlices, configureStore, createSlice } from "@reduxjs/toolkit";
import { getFiles, defaultLanguages } from "../../data";
import { File } from "../../type";
import getFileExtension from "../../utils/getFileExtension";

const randomNames = [
  'Unicorn', 'Robot', 'Ninja', 'Pirate', 'Dragon', 'Penguin', 'Alien', 'Wizard', 'Butterfly', 'Rainbow',
  'Shark', 'Fox', 'Koala', 'Squid', 'Jelly', 'Dinosaur', 'Mermaid', 'Octopus', 'Hamster', 'Dolphin',
  'Panda', 'Monkey', 'Owl', 'Croco', 'Kanga'
];

const FilesSlice = createSlice({
  name: 'files',
  initialState: { value: getFiles(), currentFileIndex: 0, currentFile: getFiles()[0] },
  reducers: {
    create: (state) => {
      const randomIndex = Math.floor(Math.random() * randomNames.length);
      const name = randomNames[randomIndex];

      const newFile = { index: Date.now(), name: `${name}.tsx`, code: '// new file', language: 'javascript', icon: defaultLanguages[2].icon }

      state.currentFileIndex = newFile.index;
      state.currentFile = newFile;
      state.value = [...state.value, newFile];
    },
    deleteFile: (state, action) => {
      state.value = state.value.filter((t: File) => t.index !== action.payload)
      localStorage.setItem('editor-file-explorer', JSON.stringify(state.value))
    },
    updateFile: (state, action) => {
      state.value = state.value.map((t: File) => {
        if (t.index === state.currentFile.index) t.code = action.payload
        return t;
      });
      localStorage.setItem('editor-file-explorer', JSON.stringify(state.value))
    },
    setFile: (state, action) => {
      state.currentFile = action.payload
      state.currentFileIndex = action.payload.index
    },
    setFileName: (state, action) => {
      state.value = state.value.map((t: File) => {
        const tabName = action.payload.trim();
        if (t.index === state.currentFileIndex) {
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
  initialState: { stdin: getFiles()[0].code },
  reducers: {
    clear: (state) => {
      state.stdin = ''
    }
  }
});

export const { create, updateFile, deleteFile, setFileName, setFile } = FilesSlice.actions;
export const { clear, set, toggle } = ConsoleSlice.actions;

export const store = configureStore({ reducer: combineSlices(FilesSlice, ConsoleSlice, EditorSlice) });

export type RootState = ReturnType<typeof store.getState>
