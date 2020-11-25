import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';

import { PonudeComponent } from './ponude/ponude.component';
import {MaterialModule} from '../../shared/material.module';
import { BodovanjeComponent } from './bodovanje/bodovanje.component';
import { TenderHomeComponent } from './tender-home/tender-home.component';


@NgModule({
  declarations: [TenderHomeComponent, PonudeComponent, BodovanjeComponent, TenderHomeComponent],
  imports: [
    CommonModule,
    TenderRoutingModule,
    MaterialModule
  ]
})
export class TenderModule { }
