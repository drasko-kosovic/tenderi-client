import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

import {Router} from '@angular/router';


import {NotificationService} from '../../../shared/notification.service';
import {TokenStorageService} from "../../auth/login/_services/token-storage.service";
import {LoginComponent} from "../../auth/login/login.component";
import {RegisterComponent} from "../../auth/register/register.component";
import {LogoutDialogComponent} from "../../auth/logout-dialog/logout-dialog.component";




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private subscription: Subscription;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username = '';
  message = 'aba';
  durationInSeconds = 5;
  navigation: any;
  welcome: string;
  currentUser: any;


  constructor(private notificationService: NotificationService, private dialog: MatDialog, private tokenStorageService: TokenStorageService, private router: Router) {

  }


  ngOnInit() {
    this.currentUser = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;


    }

    }


  logout() {
    this.tokenStorageService.signOut();

    this.router.navigate(['/home']);
    // window.location.reload();


  }

  // tslint:disable-next-line:typedef
  refresh() {
    window.location.reload();
  }

  // tslint:disable-next-line:typedef
  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openLogoutDialog() {
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.logout();
    });
  }



}


