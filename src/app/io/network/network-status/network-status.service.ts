import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkStatusService {
  private _online = new BehaviorSubject<boolean>(navigator.onLine);
  public $online = this._online.asObservable();

  constructor() {
    window.addEventListener('online', () => this.setStatus());
    window.addEventListener('offline', () => this.setStatus());
  }

  private setStatus() {
    this._online.next(navigator.onLine);
  }

  // testing
  toggle() {
    const current = this._online.getValue();
    this._online.next(!current);
  }
}
