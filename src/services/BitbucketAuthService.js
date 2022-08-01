const clientId = process.env.REACT_APP_BITBUCKET_CLIENT_ID;
const bitbucket_auth = `https://bitbucket.org/site/oauth2/authorize?client_id=${clientId}&response_type=token`;

export default class BitbucketAuthService {

  static connect() {
    this.clearToken();
    window.location.href = bitbucket_auth;
  }

  static logout() {
    localStorage.removeItem('vconsole-token');
    window.location.href = '/'
  }

  // returns access token
  static authorization() {
    try {
      let eq = window.location.hash.indexOf('=');
      let ep = window.location.hash.indexOf('&');
      let token = window.location.hash.slice(eq + 1, ep);

      localStorage.setItem('vconsole-token-expired', Date.now() + (60 * 1000 * 60));
      localStorage.setItem('vconsole-token', token);
      return token;
    } catch (error) {
      return error.message
    }
  }

  static clearToken() {
    localStorage.removeItem('vconsole-username');
    localStorage.removeItem('vconsole-token');
    localStorage.removeItem('vconsole-token-expired');
  }
}