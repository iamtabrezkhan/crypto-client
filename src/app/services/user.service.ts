import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  $compareBoxSubject = new Subject();

  constructor() { }

  saveToFavourites(data) {
    let lS = JSON.parse(localStorage.getItem('favourites'));
    if(!lS) {
      lS = [];
      lS.push(data);
      localStorage.setItem('favourites', JSON.stringify(lS));
      return;
    }
    lS.push(data);
    localStorage.setItem('favourites', JSON.stringify(lS));
  }

  removeFromFavourites(id) {
    let lS = JSON.parse(localStorage.getItem('favourites'));
    let temp = lS.filter(data => data.id !== id);
    localStorage.setItem('favourites', JSON.stringify(temp));
    return temp;
  }

  existInFavourites(id) {
    let lS = JSON.parse(localStorage.getItem('favourites'));
    if(!lS) {
      return false;
    }
    for(let item of lS) {
      if(item.id === id) {
        return true;
      }
    }
    return false;
  }

  getFavourites() {
    return JSON.parse(localStorage.getItem('favourites')) || [];
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private emitCompareBox(bool) {
    this.$compareBoxSubject.next(bool);
  }

  listenCompareBox() {
    return this.$compareBoxSubject.asObservable();
  }

  showCompareBox() {
    this.emitCompareBox(true);
  }

  hideCompareBox() {
    this.emitCompareBox(false);
  }

}
