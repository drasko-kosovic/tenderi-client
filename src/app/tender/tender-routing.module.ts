import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TenderHomeComponent} from './tender-home/tender-home.component';
import {PonudeComponent} from './ponude/ponude.component';
import {BodovanjeComponent} from './bodovanje/bodovanje.component';

const routes: Routes = [
  {
    path: '',
    component: TenderHomeComponent
  },
  {
    path: 'ponude',
    component: PonudeComponent
  },
  {
    path: 'bodovanje',
    component: BodovanjeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRoutingModule { }
