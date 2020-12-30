import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JednostavneHomeComponent } from './jednostavne-home/jednostavne-home.component';

const routes: Routes = [
  {
    path: '',
    component: JednostavneHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JednostavneRoutingModule { }
