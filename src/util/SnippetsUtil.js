import axios from 'axios';

const SNIPPET_FOLDER_PATH = window.location.origin + '/snippets/';

export default class SnippetsUtil {

  // Snippets: ['react', 'js']
  static async getFolders () {
    let folders = await axios.get(SNIPPET_FOLDER_PATH);
    return folders.data;
  }

  // react: ['react-tabs', 'useState']
  static async getFiles (folderName) {
    let files = await axios.get(SNIPPET_FOLDER_PATH + folderName);
    return files.data;
  }

  // dirFile: folder + filename
  static async getFileContent (dirFile) {
    let files = await axios.get(SNIPPET_FOLDER_PATH + dirFile);
    return files.data;
  }

  // example: for-in-for-of.js
  static formatFileName (filename) {
    filename = filename.replace(/-/g, ' ');
    let idx = filename.lastIndexOf('.');
    return filename.slice(0, idx);
  }
}