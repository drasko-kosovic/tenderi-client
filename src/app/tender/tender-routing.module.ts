import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TenderHomeComponent} from './tender-home/tender-home.component';

const routes: Routes = [
  {
    path: '',
    component: TenderHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRoutingModule { }
