import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PregovarckiRoutingModule } from './pregovarcki-routing.module';
import { PregovarackiHomeComponent } from './pregovaracki-home/pregovaracki-home.component';


@NgModule({
  declarations: [PregovarackiHomeComponent],
  imports: [
    CommonModule,
    PregovarckiRoutingModule
  ]
})
export class PregovarckiModule { }
