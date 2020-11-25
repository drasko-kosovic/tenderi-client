import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';
import { TenderHomeComponent } from './tender-home/tender-home.component';
import { PonudeComponent } from './ponude/ponude.component';
import {MaterialModule} from '../../shared/material.module';
import { BodovanjeComponent } from './bodovanje/bodovanje.component';


@NgModule({
  declarations: [TenderHomeComponent, PonudeComponent, BodovanjeComponent],
  imports: [
    CommonModule,
    TenderRoutingModule,
    MaterialModule
  ]
})
export class TenderModule { }
