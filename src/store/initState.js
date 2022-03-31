const initState = localStorage.getItem('config')
  ? JSON.parse(localStorage.getItem('config'))
  : {
    tabIndex: 0,
    message: '',
    showSnackbar: false,
    fontSizes: [10, 12, 14, 16, 18, 20, 22, 24, 26],
    showAddLibModal: false,
    showInfoModal: false,
    isRunning: false,
    minimap: false,
    theme: 'vs-dark',
    fontSize: 14,
    language: { id: 1, name: 'javascript', extension: 'js', syntax: 'typescript', version: '' }
  };

document.documentElement.setAttribute('data-theme', initState.theme);

if (!initState.tabIndex || !initState.language) localStorage.removeItem('config');

export default initState