import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/services/user.service';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', {static: false}) canvas: ElementRef;

  @Input() cryptos = [];
  chart;

  constructor(
    private userService: UserService,
    private chartService: ChartService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let labels = ['1h', '24h'];
    let dataSets = [];
    for(let crypto of this.cryptos) {
      let label = crypto.name;
      let borderColor = this.userService.getRandomColor();
      let changedPrice = 0;
      if(crypto.quote.USD.percent_change_24h > 0) {
        changedPrice = ((crypto.quote.USD.percent_change_24h*crypto.quote.USD.price)/100)+crypto.quote.USD.price;
      } else if(crypto.quote.USD.percent_change_24h < 0) {
        changedPrice = ((crypto.quote.USD.percent_change_24h*crypto.quote.USD.price)/100)
      }
      let data = [
        crypto.quote.USD.percent_change_24h > 0 ? changedPrice-crypto.quote.USD.price : changedPrice < 0 ? crypto.quote.USD.price+changedPrice : crypto.quote.USD.price,
        crypto.quote.USD.price];
      let obj = {
        data,
        label,
        borderColor,
        fill: false
      }
      dataSets.push(obj);
    }
    let options = {
      title: {
        display: true,
        text: 'Change in price($USD) in last 24 hours'
      }
    }
    let chartData = {
      labels,
      datasets: dataSets
    }
    let ctx = this.canvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options
    })
  }

  closeChart() {
    this.chartService.closeChart();
  }

}
