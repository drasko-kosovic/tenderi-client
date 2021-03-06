import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';

import { PonudeComponent } from './ponude/ponude.component';
import { MaterialModule } from '../../shared/material.module';
import { BodovanjeComponent } from './bodovanje/bodovanje.component';
import { TenderHomeComponent } from './tender-home/tender-home.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PrvorangiraniComponent } from './prvorangirani/prvorangirani.component';
import { DeleteDialogComponent } from './dialog/delete/delete.dialog.component';
import { AddDialogComponent } from './dialog/add/add.dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './dialog/edit/edit.component';
import { HvalePartijeComponent } from './hvale-partije/hvale-partije.component';
import { PerkoProcijenjeneComponent } from './perko-procijenjene/perko-procijenjene.component';
import { PonudeUserComponent } from './ponude-user/ponude-user.component';
import { UgovorenePonudeComponent } from './ugovorene-ponude/ugovorene-ponude.component';
import { UgovorComponent } from './dialog/ugovor/ugovor.component';
import { AdminComponent } from './admin/admin.component';



@NgModule({
  declarations: [
    TenderHomeComponent,
    PonudeComponent,
    BodovanjeComponent,
    TenderHomeComponent,
    PrvorangiraniComponent,
    DeleteDialogComponent,
    AddDialogComponent,
    EditComponent,
    HvalePartijeComponent,
    PerkoProcijenjeneComponent,
    PonudeUserComponent,
    UgovorenePonudeComponent,
    UgovorComponent,
    AdminComponent,
    
    
    
  ],
  imports: [
    CommonModule,
    TenderRoutingModule,
    MaterialModule,
    MatTableExporterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TenderModule {}
