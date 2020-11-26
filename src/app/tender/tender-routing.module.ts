import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PonudeComponent} from './ponude/ponude.component';
import {BodovanjeComponent} from './bodovanje/bodovanje.component';
import {TenderHomeComponent} from './tender-home/tender-home.component';
import {IzvozComponent} from "./izvoz/izvoz.component";
import {PrvorangiraniComponent} from "./prvorangirani/prvorangirani.component";

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
  ,
  {
    path: 'prvorangirani',
    component: PrvorangiraniComponent
  }
  ,
  {
    path: 'izvoz',
    component: IzvozComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRoutingModule { }
