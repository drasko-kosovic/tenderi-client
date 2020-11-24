import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';
import { TenderHomeComponent } from './tender-home/tender-home.component';


@NgModule({
  declarations: [TenderHomeComponent],
  imports: [
    CommonModule,
    TenderRoutingModule
  ]
})
export class TenderModule { }
