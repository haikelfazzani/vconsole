const initState = (() => {
  if (localStorage.getItem('config-2')) {
    return JSON.parse(localStorage.getItem('config-2'))
  }
  else {
    const settings = {
      tabIndex: 0,
      message: '',
      showSnackbar: false,
      showAddLibModal: false,
      showInfoModal: false,
      isRunning: false,
      language: { id: 1, name: 'javascript', extension: 'js', syntax: 'typescript', version: '' },
      editorOptions: {
        fontSize: 14,
        tabSize: 2,
        theme: 'vs-dark',
        minimap: { enabled: false }
      }
    }

    localStorage.setItem('config-2', JSON.stringify(settings))
    return settings
  }
})();

document.documentElement.setAttribute('data-theme', initState.editorOptions.theme);

export default initState