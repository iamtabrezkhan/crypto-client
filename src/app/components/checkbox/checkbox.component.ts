import { Component, OnInit, Input, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { Animations } from 'src/app/shared/animations/animation';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  animations: [
    Animations.pop
  ]
})
export class CheckboxComponent implements OnInit {

  @Input() isChecked;
  @Input() id;
  @Output() onToggle = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.onToggle.emit(this.id);
  }

}
