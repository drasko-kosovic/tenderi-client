import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';
import { TenderHomeComponent } from './tender-home/tender-home.component';
import { PonudeComponent } from './ponude/ponude.component';
import {MaterialModule} from '../../shared/material.module';


@NgModule({
  declarations: [TenderHomeComponent, PonudeComponent],
  imports: [
    CommonModule,
    TenderRoutingModule,
    MaterialModule
  ]
})
export class TenderModule { }
