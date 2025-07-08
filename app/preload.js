"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    windowAction: (action) => electron_1.ipcRenderer.send('window', [action]),
    showNotification: (title) => electron_1.ipcRenderer.send('notification', [{ title }]),
    setAutoLaunch: (enabled) => electron_1.ipcRenderer.send('auto-launch', enabled),
});
//# sourceMappingURL=preload.js.map