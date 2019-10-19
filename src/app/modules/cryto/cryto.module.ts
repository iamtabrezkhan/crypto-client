import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrytoRoutingModule } from './cryto-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CrytoRoutingModule,
    SharedModule
  ]
})
export class CrytoModule { }
