// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// const ipc = require('electron').ipcRenderer;

document.title = 'Connect to Live Results - SCDS';

let connectRegister = document.getElementById('create-account-button')
let connectForm = document.getElementById('connect-form');

connectForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let orgId = document.getElementById('org-id').value
  let apiKey = document.getElementById('api-key').value

  let credentialObject = {
    'organisationId': orgId,
    'apiKey': apiKey
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
  if (arg.status) {
    let html = '<h2>Connected to <span id="central-card-club-name"></span></h2>';
    html += '<form id="comp-select"><div class="form-group"><label for="comp">Select Competition</label><select aria=describedby="comp-help" id="comp" class="custom-select"><option selected>Open this select menu</option></select><small id="emailHelp" class="form-text text-muted">If you can\'t see your competition, make sure it exists in the cloud.</small></div>';
    html += '<div class="form-group">';
    html += '<label for="files-location">';
    html += 'SportSystems Gala Files Directory'
    html += '</label>'
    html += '<div class="custom-file">'
    html += '<input type="file" class="custom-file-input" id="files-location" required>'
    html += '<label class="custom-file-label" for="customFile">Choose file</label>'
    html += '</div>'
    html += '</div>'
    html += '<p class="mb-0"><button class="btn btn-primary" type="submit">Start</button></p>'
    html += '</form>'
    document.getElementById('central-card').innerHTML = html;
    document.getElementById('central-card-club-name').textContent = arg.organisation.name;
    document.getElementById('files-location').addEventListener('click', () => {
      event.preventDefault();
      window.postMessage({
        type: 'select-dirs'
      })
    })
    document.title = 'Live Results - ' + arg.organisation.name + ' - SCDS';

    document.getElementById('comp-select').addEventListener('submit', (event) => {
      event.preventDefault();

      let competition = document.getElementById('comp').value;
      let directory = document.getElementById('files-location').dataset.path

      let compDetails = {
        'competition': competition,
        'directory': directory
      }

      window.api.send('startListening', compDetails);
      console.log('SENT')
    });
  } else {
    document.getElementById('form-status').innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><p class="mb-0"><strong>Incorrect details!</strong></p><p class="mb-0">Please check that your Organisation ID and your API key are correct.</p><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
  }
})

// registerButton.addEventListener('click', (event) => {
//   // shell.openExternal('https://live.myswimmingclub.uk/register')
//   window.api.send('toMain', 'beep');
// })