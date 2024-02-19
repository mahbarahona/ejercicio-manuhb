import { Injectable } from '@angular/core';
import { StorageData } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageKey = 'app-data';
  constructor() {}

  load() {
    const serialized = localStorage.getItem(this.storageKey) || '';
    if (!serialized) {
      return false;
    }
    const data = JSON.parse(serialized);
    return data;
  }
  save(data: StorageData) {
    const serialized = JSON.stringify(data);
    localStorage.setItem(this.storageKey, serialized);
  }
}
