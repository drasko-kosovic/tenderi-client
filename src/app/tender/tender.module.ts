import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';

import { PonudeComponent } from './ponude/ponude.component';
import {MaterialModule} from '../../shared/material.module';
import { BodovanjeComponent } from './bodovanje/bodovanje.component';
import { TenderHomeComponent } from './tender-home/tender-home.component';
import {MatTableExporterModule} from 'mat-table-exporter';
import { IzvozComponent } from './izvoz/izvoz.component';


@NgModule({
  declarations: [TenderHomeComponent, PonudeComponent, BodovanjeComponent, TenderHomeComponent, IzvozComponent],
  imports: [
    CommonModule,
    TenderRoutingModule,
    MaterialModule,
    MatTableExporterModule
  ]
})
export class TenderModule { }
