import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private db: IDBDatabase;

  constructor() {
    const openRequest = indexedDB.open('db', 2);

    openRequest.onsuccess = () => {
      this.db = openRequest.result;
    };

    openRequest.onupgradeneeded = () => {
      this.db = openRequest.result;
      if (!this.db.objectStoreNames.contains('tasks')) {
        this.db.createObjectStore('tasks', { keyPath: 'date' });
      }

      if (!this.db.objectStoreNames.contains('notes')) {
        this.db.createObjectStore('notes', { keyPath: 'timestamp' });
      }
    };
  }

  public setData(storeName: string, data: any) {
    if (this.db) {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      store.put(data);
    }
  }

  public removeData(storeName: string, key: any) {
    if (this.db) {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      store.delete(key);
    }
  }

  public getAll(storeName: string) {
    if (this.db) {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = (result) => {
        console.log(request.result);
      };
    }
  }

  public async get(storeName: string, key): Promise<any> {
    return new Promise((resolve) => {
      if (this.db) {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onsuccess = (result) => {
          resolve(request.result);
        };
      }
    });
  }
}
