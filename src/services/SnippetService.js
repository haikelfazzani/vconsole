import axios from 'axios';

export default class SnippetService {

  static async getSnippets () {
    try {
      let snippets = await axios.get('https://api.jsonbin.io/b/5e9f66352940c704e1dc49d6/latest')
      return snippets.data;
    } catch (error) { }
  }

  static async getSnippet (hookName) {
    try {
      let snippets = await this.getSnippets();
      let urlSnippet = snippets.find(e => e.hook === hookName).url;

      let snippet = await axios.get(urlSnippet)
      return snippet.data;
    } catch (error) { }
  }

}