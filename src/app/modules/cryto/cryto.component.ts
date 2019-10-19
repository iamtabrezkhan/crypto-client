import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CryptoService } from 'src/app/services/crypto.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import { Animations } from '../../shared/animations/animation';
import { ChartService } from 'src/app/services/chart.service';
import 'hammerjs';
import { SliderService } from 'src/app/services/slider.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crypto',
  templateUrl: './cryto.component.html',
  styleUrls: ['./cryto.component.scss'],
  animations: [
    Animations.pop,
    Animations.showCheck,
    Animations.popFromBottom
  ]
})
export class CrytoComponent implements OnInit {

  @ViewChild('dataRows', {static: false}) dataRows: ElementRef;

  cryptos;
  cryptosCopy;
  start = 1;
  limit = 200;
  paginationArray = [1, 2, 3, 4];
  sortByPrice = false;
  sortByMarketCap = false;
  @Input('favOptions') favOptions = false;
  chartOpen = false;
  chartData;
  timeOutInterval;
  holdTime = 500;
  wasLongPressed = false;
  canAdd = true;
  dataForComparison = [];
  canCompare = false;
  priceRange = {
    lower: 0,
    upper: 15000
  }
  marketCapRange = {
    lower: 0,
    upper: 150000000000
  }

  constructor(
    private cryptoService: CryptoService,
    private spinnerService: SpinnerService,
    private userService: UserService,
    private chartService: ChartService,
    private sliderService: SliderService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if(!this.favOptions) {
      this.spinnerService.startSpin();
      this.cryptoService.getLatestListings((this.start*this.limit)-this.limit+1, this.limit).subscribe(
        data => {
          if(data['success']) {
            this.cryptos = data['data']['data'];
            this.cryptosCopy = this.cryptos.slice();
            this.spinnerService.stopSpin();
          } else {
            this.spinnerService.stopSpin();
            this.toastr.error(data['error_message'], 'Error');
          }
        },
        err => {
          this.spinnerService.stopSpin();
          this.toastr.error('Something went wrong!', 'Oops');
        }
      )
    } else {
      this.cryptos = this.userService.getFavourites();
      this.cryptosCopy = this.cryptos.slice();
    }
    this.sliderService.listenRange().subscribe(
      ({price, marketCap}) => {
        this.spinnerService.startSpin();
        this.cryptos = this.filterRange(price, marketCap);
        this.spinnerService.stopSpin();
      }
    )
    this.userService.listenCompareBox().subscribe(
      (bool: boolean) => {
        this.canCompare = bool;
      }
    )
    this.chartService.listenChart().subscribe(({open, data}) => {
      this.chartOpen = open;
      this.chartData = data;
    })
  }

  scrollContainerToTop() {
    try {
      this.dataRows.nativeElement.scrollTo(0, 0);
    } catch (error) {
      
    }
  }

  getNext() {
    this.start++;
    this.scrollContainerToTop();
    this.spinnerService.startSpin();
    this.cryptoService.getLatestListings((this.start*this.limit)-this.limit+1, this.limit).subscribe(
      data => {
        if(data['success']) {
          this.cryptos = data['data']['data'];
          this.cryptosCopy = this.cryptos.slice();
          if(this.start >= this.paginationArray[this.paginationArray.length-1]) {
            this.paginationArray.shift();
            this.paginationArray.push(this.start+1);
          }
          this.spinnerService.stopSpin();
        } else {
          this.spinnerService.stopSpin();
          this.toastr.error(data['error_message'], 'Error');
          this.start--;
        }
      },
      err => {
        this.spinnerService.stopSpin();
        this.toastr.error('Something went wrong!', 'Oops');
        this.start--;
      }
    )
  }

  getPrev() {
    if(this.start === 1) {
      return;
    }
    this.start--;
    this.scrollContainerToTop();
    this.spinnerService.startSpin();
    this.cryptoService.getLatestListings((this.start*this.limit)-this.limit+1, this.limit).subscribe(
      data => {
        if(data['success']) {
          this.cryptos = data['data']['data'];
          this.cryptosCopy = this.cryptos.slice();
          if(this.start > 1) {
            if(this.start <= this.paginationArray[0]) {
              this.paginationArray.pop();
              this.paginationArray.unshift(this.start-1);
            }
          }
          this.spinnerService.stopSpin();
        } else {
          this.spinnerService.stopSpin();
          this.toastr.error(data['error_message'], 'Error');
          this.start++;
        }
      },
      err => {
        this.spinnerService.stopSpin();
        this.toastr.error('Something went wrong!', 'Oops');
        this.start++;
      }
    )
  }

  goToPage(page) {
    if(page === this.start) {
      return;
    }
    this.spinnerService.startSpin();
    let prevStart = this.start;
    this.start = page;
    this.cryptoService.getLatestListings((this.start*this.limit)-this.limit+1, this.limit).subscribe(
      data => {
        if(data['success']) {
          this.scrollContainerToTop();
          this.cryptos = data['data']['data'];
          this.cryptosCopy = this.cryptos.slice();
          if(this.start >= this.paginationArray[this.paginationArray.length-1]) {
            this.paginationArray = [];
            for(let i=this.start-1; i<this.start+3; i++) {
              this.paginationArray.push(i);
            }
            if(this.start >= this.paginationArray[this.paginationArray.length-1]) {
              this.paginationArray.shift();
              this.paginationArray.push(this.start+1);
            }
          }
          if(this.start > 1) {
            if(this.start <= this.paginationArray[0]) {
              this.paginationArray = [];
              for(let i=this.start-2; i<this.start+2; i++) {
                this.paginationArray.push(i);
              }
            }
          }
          this.spinnerService.stopSpin();
        } else {
          this.spinnerService.stopSpin();
          this.toastr.error(data['error_message'], 'Error');
          this.start = prevStart;
        }
      },
      err => {
        this.spinnerService.stopSpin();
        this.toastr.error('Something went wrong!', 'Oops');
        this.start = prevStart;
      }
    )
  }

  // method sorts the cryptos array based on sortByPrice and sortByMarketCap properties
  // if both are false or true, it sorts based on cmc_rank
  sortAccordingly() {
    if(
      (this.sortByPrice && this.sortByMarketCap) ||
      (!this.sortByPrice && !this.sortByMarketCap)
    ) {
      // sort by cmc_rank
      this.cryptos.sort(function(a, b) {
        return parseFloat(a.cmc_rank) - parseFloat(b.cmc_rank);
      })
    } else {
      if(this.sortByPrice) {
        // sort by price
        this.cryptos.sort(function(a, b) {
          return parseFloat(a.quote.USD.price) - parseFloat(b.quote.USD.price);
        })
      }
      if(this.sortByMarketCap) {
        // sort by market_cap
        this.cryptos.sort(function(a, b) {
          return parseFloat(a.quote.USD.market_cap) - parseFloat(b.quote.USD.market_cap);
        })
      }
    }
  }

  sortPrice() {
    this.sortByPrice = !this.sortByPrice;
    this.sortAccordingly();
  }

  sortMarketCap() {
    this.sortByMarketCap = !this.sortByMarketCap;
    this.sortAccordingly();
  }

  addToFavourites(crypto) {
    this.userService.saveToFavourites(crypto);
  }

  removeFromFavourites(id) {
    this.userService.removeFromFavourites(id);
    if(this.favOptions) {
      this.cryptos = this.cryptos.filter(crypto => crypto.id !== id);
    }
  }

  alreadyInFavourites(id) {
    return this.userService.existInFavourites(id);
  }

  onRowClick(crypto, e) {
    if(
      e.target.classList.contains('heart') ||
      e.target.classList.contains('fa-heart') ||
      e.target.classList.contains('fa-times') ||
      e.target.classList.contains('cross') ||
      e.target.classList.contains('fa-check') ||
      e.target.classList.contains('check-box')
    ) {
      return;
    }
    if(this.dataForComparison.length > 0) {
      if(window.innerWidth > 480) {
        if(this.canAdd) {
          this.toggleSelected(crypto);
        }
      } else {
        this.toggleSelected(crypto);
      }
    } else {
      this.openChart(crypto);
    }
    this.canAdd = true;
  }

  openChart(...data) {
    this.chartData = data;
    this.chartOpen = true;
  }

  onLongPress(crypto, e) {
    if(this.dataForComparison.length > 0) {
      return;
    }
    this.wasLongPressed = true;
    this.canAdd = false;
    this.dataForComparison.push(crypto);
    this.timeOutInterval = null;
  }

  onCheckBoxToggle(id) {
    let temp = this.cryptos.filter(item => item.id === id)[0];
    this.toggleSelected(temp);
  }

  isChecked(id) {
    let temp = this.dataForComparison.filter(item => item.id === id);
    return temp.length > 0 ? true : false;
  }

  removeFromSelected(id) {
    this.dataForComparison = this.dataForComparison.filter(item => item.id !== id);
  }

  addToSelected(data) {
    if(this.dataForComparison.length > 1) {
      this.toastr.error('You can only compare two rows!', 'Alert');
      return;
    }
    this.dataForComparison.push(data);
  }

  toggleSelected(data) {
    let temp = this.dataForComparison.filter(item => item.id === data.id)[0];
    if(temp) {
      this.removeFromSelected(data.id);
    } else {
      this.addToSelected(data)
    }
    if(this.dataForComparison.length > 1) {
      this.userService.showCompareBox();
    } else {
      this.userService.hideCompareBox();
    }
  }

  showCheckbox() {
    return this.dataForComparison.length > 0 ? true : false;
  }

  compareTwo() {
    this.openChart(this.dataForComparison[0], this.dataForComparison[1]);
  }

  deselectAll() {
    this.dataForComparison = [];
    this.userService.hideCompareBox();
  }

  openSlider() {
    this.sliderService.openSlider();
    this.sliderService.sendSavedRange({
      priceRange: this.priceRange,
      marketCapRange: this.marketCapRange
    })
  }

  filterRange(price, marketCap) {
    this.priceRange = price;
    this.marketCapRange = marketCap;
    return this.cryptosCopy.filter(item => {
      return (price.lower <= item.quote.USD.price && price.upper >= item.quote.USD.price) &&
            (marketCap.lower <= item.quote.USD.market_cap && marketCap.upper >= item.quote.USD.market_cap)
    });
  }

}
