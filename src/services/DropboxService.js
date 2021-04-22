const base_url = 'https://content.dropboxapi.com/2';

export default class DropboxService {
  static async download (filename) {
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

  static async upload (content, filename) {// api_paste_name=filename
    try {
      const token = localStorage.getItem('dropbox-token');
      let file = new File([content], filename, { type: "application/javascript" });
      let resp = await fetch(base_url + '/files/upload', {
        headers: {
          Authorization: 'Bearer ' + token,
          "Dropbox-API-Arg": JSON.stringify({ path: `/${filename}` }),
          'Content-Type': 'application/octet-stream'
        },
        method: 'POST',
        body: file
      });
      let data = await resp.json();
      return 'https://www.dropbox.com/home?preview=' + data.name;
    } catch (error) {
      return error.message;
    }
  }
}