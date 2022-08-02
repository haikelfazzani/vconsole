import axios from 'axios';
import traverseObject from "../utils/traverseObject";

const BASE_URL = 'https://api.bitbucket.org/2.0/snippets';
// const REDIRECT_URL = '/login';

export default class BitbucketSnippetService {

  /** 
   * @param {FormData} formData
   * @returns {String} url
   */
  static async create(formData) {
    let resp = await axios({
      url: BASE_URL,
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + this.getToken(),
        'Content-Type': 'multipart/form-data; boundary=----------------------------63a4b224c59f',
      },
      data: formData
    });

    return resp.data.links.html.href;
  }

  /**
   * @param {FormData} formData 
   * @param {String} snippetId 
   * @returns {String} url
   */
  static async update(formData, snippetId) {
    let username = localStorage.getItem('picode-username');
    if (username) {
      let resp = await axios({
        url: `${BASE_URL}/${username}/${snippetId}`,
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + this.getToken(),
          'Content-Type': 'multipart/form-data; boundary=----------------------------63a4b224c59f',
        },
        data: formData
      });

      return resp.data.links.html.href;
    }
  }

  static async getOne(snippetId) {
    let username = localStorage.getItem('picode-username');
    if (username) {
      try {
        let resp = await axios.get(BASE_URL + '/' + username + '/' + snippetId + '?raw', {
          headers: { 'Authorization': 'Bearer ' + this.getToken() }
        });
        return resp.data;
      } catch (error) {
        return null;
      }
    }
    else {
      return null;
    }
  }

  static async delete(snippet) {
    try {
      let username = localStorage.getItem('picode-username');
      await axios({
        url: `${BASE_URL}/${username}/${snippet.id}`,
        method: 'delete',
        headers: { 'Authorization': 'Bearer ' + this.getToken() }
      });

      return true;
    } catch (error) {
      return null;
    }
  }

  static async getAll() {
    if (!this.getToken()) throw new Error('Invalid Token');

    let resp = await axios.get(BASE_URL + '?role=owner', {
      headers: { 'Authorization': 'Bearer ' + this.getToken() }
    });

    if (resp.data.values.length < 1) throw new Error('Empty list snippets');

    let username = resp.data.values[0].links.self.href.split('snippets/')[1].split('/')[0];
    localStorage.setItem('picode-username', username);
    return resp.data.values;
  }

  /**
   * @param {String} id 
   * @returns {Object} code, filename, title
   */
  static async getContent(id) {
    try {
      let snippetInfo = await this.getOne(id);
      let url = traverseObject(snippetInfo.files)[0];

      if (url) {
        let response = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + this.getToken() } });

        return {
          code: response.data,
          filename: Object.keys(snippetInfo.files)[0],
          title: snippetInfo.title
        };
      }
      else { return null; }
    } catch (error) {
      return error;
    }
  }

  static getToken() {
    const token = localStorage.getItem('vconsole-token');
    return token ? decodeURIComponent(token) : null;
  }
}