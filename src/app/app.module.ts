import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from '../shared/material.module';
import {AuthModule} from './auth/auth.module';
import {TenderModule} from './tender/tender.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    TenderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
