// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const registerButton = document.getElementById('register-button')

registerButton.addEventListener('click', (event) => {
  // shell.openExternal('https://live.myswimmingclub.uk/register')
  window.api.send('toMain', 'beep');
})