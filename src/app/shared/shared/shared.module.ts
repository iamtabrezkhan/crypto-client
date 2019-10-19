import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrytoComponent } from 'src/app/modules/cryto/cryto.component';
import { ChartComponent } from 'src/app/components/chart/chart.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { SliderComponent } from 'src/app/components/slider/slider.component';
import { IgxSliderModule } from 'igniteui-angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CrytoComponent,
    ChartComponent,
    CheckboxComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    IgxSliderModule,
    FormsModule
  ],
  exports: [
    CrytoComponent,
    ChartComponent,
    CheckboxComponent,
    SliderComponent
  ]
})
export class SharedModule { }
