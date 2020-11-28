import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';

import { PonudeComponent } from './ponude/ponude.component';
import {MaterialModule} from '../../shared/material.module';
import { BodovanjeComponent } from './bodovanje/bodovanje.component';
import { TenderHomeComponent } from './tender-home/tender-home.component';
import {MatTableExporterModule} from 'mat-table-exporter';
import { IzvozComponent } from './izvoz/izvoz.component';
import { PrvorangiraniComponent } from './prvorangirani/prvorangirani.component';
import {DeleteDialogComponent} from './dialog/delete/delete.dialog.component';
import {AddDialogComponent} from './dialog/add/add.dialog.component';
import {FormsModule} from "@angular/forms";
import {EditComponent} from "./dialog/edit/edit.component";




@NgModule({
  declarations: [TenderHomeComponent, PonudeComponent, BodovanjeComponent, TenderHomeComponent, IzvozComponent, PrvorangiraniComponent, DeleteDialogComponent,
    AddDialogComponent,
   EditComponent],
  imports: [
    CommonModule,
    TenderRoutingModule,
    MaterialModule,
    MatTableExporterModule,
    FormsModule
  ]
})
export class TenderModule { }
