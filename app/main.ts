import {
  app,
  BrowserWindow,
  screen,
  Notification,
  ipcMain
} from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

let win: BrowserWindow = null;
const args = process.argv.slice(1);
const serve = args.includes('--serve');

function createWindow(): BrowserWindow {
  const { workArea } = screen.getPrimaryDisplay();

  win = new BrowserWindow({
    x: workArea.x,
    y: workArea.y,
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    title: 'Rubtinizer',
    frame: false,
    icon: path.join(__dirname, 'rubtidnizer.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      allowRunningInsecureContent: serve,
    },
  });

  if (serve) {
    require('electron-reloader')(module);
    require('electron-debug')();
    win.loadURL('http://localhost:4200');
  } else {
    const pathIndex = fs.existsSync(path.join(__dirname, '../dist/index.html'))
      ? '../dist/index.html'
      : './index.html';

    win.loadURL(
      url.format({
        pathname: path.join(__dirname, pathIndex),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  win.on('closed', () => (win = null));
  return win;
}

app.on('ready', () => setTimeout(createWindow, 400));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (win === null) createWindow();
});

ipcMain.on('window', (event, [action]) => {
  if (!win) return;

  switch (action) {
    case 'close':
      win.close();
      break;
    case 'minimize':
      win.minimize();
      break;
    case 'maximize':
      win.isMaximized() ? win.unmaximize() : win.maximize();
      break;
  }
});

ipcMain.on('notification', (event, args) => {
  new Notification({
    title: 'Вам нужно выполнить задачу!',
    body: args[0].title,
    icon: path.join(__dirname, 'rubtidnizer.png'),
  }).show();
});

ipcMain.on('auto-launch', (event, enabled) => {
  if (!serve) {
    app.setLoginItemSettings({
      openAtLogin: enabled,
      path: app.getPath('exe'),
    });
  }
});
