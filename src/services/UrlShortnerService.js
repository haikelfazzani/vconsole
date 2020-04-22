import axios from 'axios';

export default class UrlShortnerService {

  static async getShortLink (longUrl) {
    try {
      const resp = await axios.post('https://rel.ink/api/links/', { url: longUrl });
      return 'https://rel.ink/' + resp.data.hashid;
    } catch (error) {
      return longUrl;
    }
  }

}