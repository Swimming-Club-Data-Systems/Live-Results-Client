// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// const ipc = require('electron').ipcRenderer;

let connectRegister = document.getElementById('create-account-button')
let connectForm = document.getElementById('connect-form');

document.getElementById('files-location').addEventListener('click', () => {
  event.preventDefault();
  window.postMessage({
    type: 'select-dirs'
  })
})

connectForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let orgId = document.getElementById('org-id').value
  let apiKey = document.getElementById('api-key').value
  let directory = document.getElementById('files-location').dataset.path

  let credentialObject = {
    'organisationId': orgId,
    'apiKey': apiKey,
    'directory': directory
  }

  window.api.send('connectionDetails', credentialObject);
});

connectRegister.addEventListener('click', (event) => {
  shell.openExternal('https://live.myswimmingclub.uk/register');
})

window.api.receive('file-select-path', async (arg) => {
  console.log(arg);
  if (arg.length === 1) {
    document.getElementById('files-location').dataset.path = arg[0];
    document.getElementById('files-location').required = false;
  } else {
    document.getElementById('files-location').dataset.path = null;
    document.getElementById('files-location').required = true;
  }
})

window.api.receive('connectionDetails', async (arg) => {
  console.log('LALA');
})

// registerButton.addEventListener('click', (event) => {
//   // shell.openExternal('https://live.myswimmingclub.uk/register')
//   window.api.send('toMain', 'beep');
// })