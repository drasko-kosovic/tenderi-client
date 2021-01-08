import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PregovarackiRoutingModule } from './pregovaracki-routing.module';
import { PregovarackiHomeComponent } from './pregovaracki-home/pregovaracki-home.component';
import { PregovarackiListComponent } from './pregovaracki-list/pregovaracki-list.component';



@NgModule({
  declarations: [PregovarackiHomeComponent, PregovarackiListComponent],
  imports: [
    CommonModule,
    PregovarackiRoutingModule
  ]
})
export class PregovarackiModule { }
