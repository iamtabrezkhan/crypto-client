import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { SliderService } from 'src/app/services/slider.service';
import { SliderType, IgxSliderComponent } from 'igniteui-angular';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit {

  sliderType;
  @Input() priceRange = {
    lower: 0,
    upper: 15000
  }
  @Input() marketCapRange = {
    lower: 0,
    upper: 150000000000
  }
  $priceSubject = new Subject();
  $marketSubject = new Subject();

  constructor(
    private sliderService: SliderService
  ) {
    this.sliderType = SliderType;
  }

  ngOnInit() {
    this.$priceSubject.pipe(
      debounceTime(500),
      distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y))
    ).subscribe(
      priceRange => {
        this.sliderService.sendRange({
          price: priceRange,
          marketCap: this.marketCapRange
        });
      }
    )
    this.$marketSubject.pipe(
      debounceTime(500),
      distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y))
    ).subscribe(
      marketRange => {
        this.sliderService.sendRange({
          price: this.priceRange,
          marketCap: marketRange
        });
      }
    )
  }

  ngAfterViewInit() {
  }

  closeSlider() {
    this.sliderService.closeSlider();
  }

  onPriceChange(e) {
    this.$priceSubject.next(this.priceRange);
  }

  onMarketCapChange(e) {
    this.$marketSubject.next(this.marketCapRange);
  }

}
