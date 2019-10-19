import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  $sliderSubject = new Subject();
  $rangeSubject = new Subject();
  $savedRangeSubject = new Subject();

  constructor() { }

  private emitSlider(bool) {
    this.$sliderSubject.next(bool);
  }

  listenSlider() {
    return this.$sliderSubject.asObservable();
  }

  openSlider() {
    this.emitSlider(true);
  }

  closeSlider() {
    this.emitSlider(false);
  }

  private emitRange(data) {
    this.$rangeSubject.next(data);
  }

  listenRange() {
    return this.$rangeSubject.asObservable();
  }

  sendRange(data) {
    this.emitRange(data);
  }

  private emitSavedRange(data) {
    this.$savedRangeSubject.next(data);
  }

  listenSavedRange() {
    return this.$savedRangeSubject.asObservable();
  }

  sendSavedRange(data) {
    this.emitSavedRange(data);
  }

}
