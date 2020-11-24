import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from '../shared/material.module';
import { TenderModule } from './tender/tender.module';
import { HomeComponent } from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {FooterComponent} from './layouts/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
