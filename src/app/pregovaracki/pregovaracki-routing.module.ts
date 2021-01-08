import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PregovarackiHomeComponent } from './pregovaracki-home/pregovaracki-home.component';
import { PregovarackiListComponent } from './pregovaracki-list/pregovaracki-list.component';

const routes: Routes = [
  {
    path: '',
    component: PregovarackiHomeComponent
  },
  {
    path: 'list',
    component: PregovarackiListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PregovarackiRoutingModule { }
