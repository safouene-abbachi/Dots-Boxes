import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstscreenComponent } from './firstscreen/firstscreen.component';
import { SecondscreenComponent } from './secondscreen/secondscreen.component';
import { ThirdscreenComponent } from './thirdscreen/thirdscreen.component';
const routes: Routes = [
  { path: 'firstscreen', component: FirstscreenComponent },
  { path: 'secondscreen', component: SecondscreenComponent },
  { path: 'thirdscreen', component: ThirdscreenComponent },

  { path: '', redirectTo: '/firstscreen', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
