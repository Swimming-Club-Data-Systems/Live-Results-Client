const {
  ipcRenderer
} = require('electron');
const fs = require('fs')

let fileWatch;

ipcRenderer.send('fWW', 'connected');

// ipcRenderer.on('fWW.ListenTo', (event, arg) => {
//   ipcRenderer.send('fWW', 'Enabling watcher');
// })

ipcRenderer.on('fWW.ListenTo', (event, directory) => {
  if (fileWatch == null) {
    ipcRenderer.send('fWW.Log', 'Enabling watcher on ' + directory);
    fileWatch = fs.watch(directory, { recursive: true }, (eventType, filename) => {
      if (filename) {
        console.log(filename);
        ipcRenderer.send('fWW.Log', filename);
      }
    });
    ipcRenderer.send('fWW.Log', 'Enabled watcher');
  } else {
    ipcRenderer.send('fWW.Log', 'Watcher already registered');
  }
})

ipcRenderer.on('fWW.StopListening', (event) => {
  fileWatch.close();
})