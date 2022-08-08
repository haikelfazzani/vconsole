import axios from "axios";

const BASE_URL = 'https://api.bitbucket.org/2.0/user';

export default class BitbucketUserService {

  static async getCurrentUser() {
    let resp = await axios.get(BASE_URL, {
      headers: {
        'Authorization': 'Bearer ' + this.getToken()
      }
    });

    localStorage.setItem('vconsole-username', resp.data.username);
    return resp.data;
  }

  static getToken() {
    const token = localStorage.getItem('vconsole-token');
    return token ? decodeURIComponent(token) : null;
  }
}