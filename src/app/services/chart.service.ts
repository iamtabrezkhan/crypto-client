import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  $chartSubject = new Subject();

  constructor() { }

  emitChart(bool, data) {
    this.$chartSubject.next({
      open: bool,
      data: data
    });
  }

  listenChart() {
    return this.$chartSubject.asObservable();
  }

  openChart(data) {
    this.emitChart(true, data);
  }

  closeChart() {
    this.emitChart(false, null);
  }

}
