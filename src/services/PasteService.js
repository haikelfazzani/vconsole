import DropboxService from "./DropboxService";
const base_url = 'https://paste.mxsrv.workers.dev';

export default class SnippetService {

  static async save (service, body) {

    switch (service) {
      case 'dropbox':
        return await DropboxService.upload(body.content, body.filename);

      case 'glot':
        return await this.glot(body);

      default:
        break;
    }
  }

  static async glot (body) {
    let token = body.token || localStorage.getItem('glot-token');
    let resp = await fetch(base_url, {
      body: JSON.stringify({
        "language": body.language || "javascript",
        "title": body.title,
        "public": true,
        "files": [{ "name": body.filename, "content": body.content }]
      }),
      headers: { 'Content-Type': 'application/json', Authorization: 'Token ' + token },
      method: 'POST'
    });

    let data = await resp.json();
    return data
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
