import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import {MaterialModule} from "../../shared/material.module";
import {MatTableExporterModule} from "mat-table-exporter";
import {AddDialogComponent} from "./student-dialog/add/add.dialog.component";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [StudentListComponent,AddDialogComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MaterialModule,
    MatTableExporterModule,
    FormsModule
  ]
})
export class StudentModule { }
