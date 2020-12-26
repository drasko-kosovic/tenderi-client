import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PregovarackiHomeComponent } from './pregovaracki-home/pregovaracki-home.component';

const routes: Routes = [
  {
    path: '',
    component: PregovarackiHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PregovarackiRoutingModule { }
