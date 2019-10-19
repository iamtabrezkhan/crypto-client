import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavouriteComponent } from './components/favourite/favourite.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  { path: 'crypto', loadChildren: () => import('./modules/cryto/cryto.module').then(m => m.CrytoModule) },
  {
    path: 'favourites', component: FavouriteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
