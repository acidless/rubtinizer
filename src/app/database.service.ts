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
        const store = this.db.createObjectStore('tasks', { keyPath: 'date' });
        store.createIndex('timestamp_idx', 'timestamp', { unique: false });
      }

      if (!this.db.objectStoreNames.contains('notes')) {
        this.db.createObjectStore('notes', { keyPath: 'timestamp' });
      }

      if (!this.db.objectStoreNames.contains('labels')) {
        this.db.createObjectStore('labels', { keyPath: 'timestamp' });
      }
    };
  }

  public whenLoaded(fn: Function) {
    const interval = setInterval(() => {
      if (this.db) {
        fn();
        clearInterval(interval);
      }
    }, 10);
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

  public removeDataByIndex(storeName: string, index: any, value: any) {
    if (this.db) {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      const pdestroy = store.index(index).openKeyCursor(value);

      pdestroy.onsuccess = function () {
        const cursor = pdestroy.result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          cursor.continue();
        }
      };
    }
  }

  public getAll(storeName: string): Promise<any> {
    return new Promise((resolve) => {
      if (this.db) {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => {
          resolve(request.result);
        };
      }
    });
  }

  public async get(storeName: string, key): Promise<any> {
    return new Promise((resolve) => {
      if (this.db) {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onsuccess = () => {
          resolve(request.result);
        };
      }
    });
  }
}
