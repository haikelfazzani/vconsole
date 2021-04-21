const base_url = 'https://content.dropboxapi.com/2';

export default class DropboxService {
  static async download (filename = "vconsole.js") {
    try {
      const token = localStorage.getItem('dropbox-token');
      let resp = await fetch(base_url + '/files/download', {
        headers: {
          Authorization: 'Bearer ' + token,
          "Dropbox-API-Arg": JSON.stringify({ path: `/${filename}` })
        },
        method: 'POST'
      });
      let data = await resp.text();
      return data;
    } catch (error) {
      return null;
    }
  }

  static async upload (api_paste_code, api_paste_name = "vconsole.js") {// api_paste_name=filename
    try {
      const token = localStorage.getItem('dropbox-token');
      let file = new File([api_paste_code], api_paste_name, { type: "application/javascript" });
      let resp = await fetch(base_url + '/files/upload', {
        headers: {
          Authorization: 'Bearer ' + token,
          "Dropbox-API-Arg": JSON.stringify({ path: `/${api_paste_name}` }),
          'Content-Type': 'application/octet-stream'
        },
        method: 'POST',
        body: file
      });
      let data = await resp.json();
      return 'https://www.dropbox.com/home?preview=' + data.name;
    } catch (error) {
      return null;
    }
  }
}