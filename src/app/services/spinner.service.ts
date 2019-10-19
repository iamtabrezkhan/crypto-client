import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

    $spinnerSubject = new Subject();

    constructor() { }

    emitSpinEvent(bool: Boolean) {
        this.$spinnerSubject.next(bool);
    }
    
    listenSpinEvent() {
        return this.$spinnerSubject.asObservable();
    }

    startSpin() {
        this.emitSpinEvent(true);
    }

    stopSpin() {
        this.emitSpinEvent(false);
    }
}
