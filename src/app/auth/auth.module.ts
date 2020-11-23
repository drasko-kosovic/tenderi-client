import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {LogoutDialogComponent} from './logout-dialog/logout-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [LoginComponent, LogoutDialogComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatDialogModule
  ]
})
export class AuthModule { }
