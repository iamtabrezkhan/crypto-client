import { Component, OnInit, AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { Animations } from './shared/animations/animation';
import { UserService } from './services/user.service';
import { SliderService } from './services/slider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    Animations.fade,
    Animations.popFromBottom,
    Animations.slider
  ]
})
export class AppComponent implements OnInit, AfterContentChecked {

  title = 'crypto-client';
  isSidebarOpen = false;
  isOverlay = false;
  isSlider = false;
  isLoading: boolean = false;
  priceRange = {
    lower: 0,
    upper: 15000
  }
  marketCapRange = {
    lower: 0,
    upper: 150000000000
  }

  constructor(
    private spinnerService: SpinnerService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private sliderService: SliderService
  ) {

  }

  ngOnInit() {
    this.sliderService.listenSavedRange().subscribe(
      ({priceRange, marketCapRange}) => {
        this.priceRange = priceRange;
        this.marketCapRange = marketCapRange;
      }
    )
    this.sliderService.listenSlider().subscribe(
      (bool: boolean) => {
        this.isSlider = bool;
        this.isOverlay = bool;
      }
    )
    this.spinnerService.listenSpinEvent().subscribe(
      (bool: boolean) => {
        this.isLoading = bool;
      }
    )
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  openSidebar() {
    this.isSidebarOpen = true;
    this.isOverlay = true;
  }
  
  closeSidebar() {
    this.isSidebarOpen = false;
    this.toggleOverlay();
  }

  toggleOverlay() {
    this.isOverlay = false;
    this.isSidebarOpen = false;
    this.isSlider = false;
  }

}
