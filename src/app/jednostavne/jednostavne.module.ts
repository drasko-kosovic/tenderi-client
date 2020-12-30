import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JednostavneRoutingModule } from './jednostavne-routing.module';
import { JednostavneHomeComponent } from './jednostavne-home/jednostavne-home.component';


@NgModule({
  declarations: [JednostavneHomeComponent],
  imports: [
    CommonModule,
    JednostavneRoutingModule
  ]
})
export class JednostavneModule { }
