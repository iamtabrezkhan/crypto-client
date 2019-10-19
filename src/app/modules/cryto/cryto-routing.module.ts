import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrytoComponent } from './cryto.component';

const routes: Routes = [{ path: '', component: CrytoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrytoRoutingModule { }
