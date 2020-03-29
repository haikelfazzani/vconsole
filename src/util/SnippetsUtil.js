import axios from 'axios';

export default class SnippetsUtil {

  // Snippets: ['react', 'js']
  static async getFolders () {
    let folders = await axios.get('/snippets');
    return folders.data;
  }

  // react: ['react-tabs', 'useState']
  static async getFiles (folderName) {
    let files = await axios.get('/snippets/' + folderName);
    return files.data;
  }

  // dirFile: folder + filename
  static async getFileContent (dirFile) {
    let files = await axios.get('/snippets/' + dirFile);
    return files.data;
  }

  // example: for-in-for-of.js
  static formatFileName (filename) {
    filename = filename.replace(/-/g, ' ');
    let idx = filename.lastIndexOf('.');
    return filename.slice(0, idx);
  }
}