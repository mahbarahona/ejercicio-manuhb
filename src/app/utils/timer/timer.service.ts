import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private startTime!: number;

  start() {
    this.startTime = performance.now();
  }

  stop() {
    const endTime = performance.now();
    const duration = endTime - this.startTime;
    return duration;
  }
}
