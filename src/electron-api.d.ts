import type { OpenDialogOptions, OpenDialogReturnValue } from 'electron';

export interface ElectronAPI {
  windowAction(action: 'close' | 'minimize' | 'maximize'): void;
  showNotification(title: string): void;
  setAutoLaunch(enabled: boolean): void;
  openDialog(options: OpenDialogOptions): Promise<OpenDialogReturnValue>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
