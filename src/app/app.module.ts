import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material.module';
import { TenderModule } from './tender/tender.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableExporterModule } from 'mat-table-exporter';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutDialogComponent } from './auth/logout-dialog/logout-dialog.component';
import { AuthService } from './auth/login/_services/auth.service';
import { NotificationService } from '../shared/notification.service';
import { authInterceptorProviders } from './auth/login/_helpers/auth.interceptor';
import { TokenStorageService } from './auth/login/_services/token-storage.service';
import { UsersComponent } from './auth/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    LogoutDialogComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatTableExporterModule,
    ReactiveFormsModule,
   
  ],
  providers: [
    AuthService,
    TokenStorageService,
    authInterceptorProviders,
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
