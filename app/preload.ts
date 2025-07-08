import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
  windowAction: (action) => ipcRenderer.send('window', [action]),
  showNotification: (title) => ipcRenderer.send('notification', [{ title }]),
  setAutoLaunch: (enabled) => ipcRenderer.send('auto-launch', enabled),
});
