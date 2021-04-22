import DropboxService from "./DropboxService";
const base_url = 'https://paste.mxsrv.workers.dev';

export default class SnippetService {

  static async save (service, options, content) {
    switch (service) {
      case 'dropbox':
        return await DropboxService.upload(content, options.filename);

      case 'glot':
        return await this.glot(options, content);

      default:
        break;
    }
  }

  static async glot (options, content) {
    let token = options.token || localStorage.getItem('glot-token');
    let resp = await fetch(base_url, {
      body: JSON.stringify({
        language: options.language || "javascript",
        title: options.title,
        public: true,
        files: [{ name: options.filename, content }],
        token
      }),
      method: 'POST'
    });

    let data = await resp.json();
    return data.url
  }

  static async raw (pasteURL) {
    try {
      const url = `http://haikel.pythonanywhere.com?url=${pasteURL}`;
      let resp = await fetch(url);
      let txt = await resp.text();
      return txt;
    } catch (error) {
      return '';
    }
  }
}
