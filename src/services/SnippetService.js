export default class SnippetService {
  static async all () {
    let resp = await fetch('https://api.npoint.io/6beb7f1b0a9f0b10f6af');
    let json = await resp.json();
    return json
  }

  static async rawFile (url) {
    let resp = await fetch(url);
    let txt = await resp.text();
    return txt
  }
}