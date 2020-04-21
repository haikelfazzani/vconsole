import LocalData from "../util/LocalData";
import UrlShortnerService from "../services/UrlShortnerService";

const editorInitState = {
  code: null,
  isCopied: false
}

export default function editorReducer (state, event, exec) {
  switch (event.type) {

    case 'DOWNLOAD_CODE':
      const dType = 'data:text/plain;charset=utf-8,';
      let codeResult = LocalData.getTabs().reduce((a, c) => c.code + '\n' + a, '');

      return { ...state, code: dType + encodeURIComponent(codeResult) };

    case 'COPY_LINK':
      exec(async () => {
        let codeResult = LocalData.getTabs();

        const encodedData = window.btoa(JSON.stringify(codeResult));
        let url = window.location.origin + '/react-playground?r=' + encodedData;

        let shortUrl = await UrlShortnerService.getShortLink(url);

        const el = document.createElement('textarea');
        el.value = shortUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      });

      return { ...state, isCopied: true };

    case 'IS_COPIED':
      return { ...state, isCopied: false };

    default:
      return state;
  }
};

export { editorReducer, editorInitState };