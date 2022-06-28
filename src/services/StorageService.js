import axios from "axios";

const BASE_URL = process.env.NODE_ENV === 'production'
  ? window.location.origin
  : 'http://localhost:9000';

export default class StorageService {

  static async save() {
    const response = await axios.get(BASE_URL + '/.netlify/functions/store');
    console.log(response.data);

  }
}