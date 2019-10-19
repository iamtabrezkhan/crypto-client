import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() menuButton = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuButton.emit(true);
  }

}
