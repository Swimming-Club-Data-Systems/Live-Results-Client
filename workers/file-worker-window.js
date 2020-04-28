const {
  ipcRenderer
} = require('electron');
const fs = require('fs')

ipcRenderer.send('fWW', 'connected');

const watcher;

ipcRenderer.on('fWW.ListenTo', (event, directory) => {
  // try {
  //   watcher = fs.watch(directory, { recursive: true }, (eventType, filename) => {
  //     if (filename) {
  //       console.log(filename);
  //       ipcRenderer.send('fWW.Log', filename);
  //       // Prints: fn
  //     }
  //   });
  // } catch (error) {
  //   ipcRenderer.send('fWW', error);
  // }
  ipcRenderer.send('fWW', directory);
  ipcRenderer.send('fWW.Log', 'Enabled watcher');
})

ipcRenderer.on('fWW.StopListening', (event) => {
  watcher.close();
})