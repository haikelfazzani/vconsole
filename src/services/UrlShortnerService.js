import axios from 'axios';

//const PROXY_URL = 'https://fd-proxy.netlify.com/.netlify/functions/index?baseurl=';

export default class UrlShortnerService {

  // 'https://u.nu/api.php?action=shorturl&format=simple&url=' + longUrl
  static async getShortLink (longUrl) {
    try {
      const resp = await axios.post('https://rel.ink/api/links/', { url: longUrl });
      return 'https://rel.ink/' + resp.data.hashid;
    } catch (error) {
      return longUrl;
    }
  }

}