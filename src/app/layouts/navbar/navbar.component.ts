import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

import {Router} from '@angular/router';


import {NotificationService} from '../../../shared/notification.service';




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
  push: any;

// tslint:disable-next-line:max-line-length
  constructor(private notificationService: NotificationService, private dialog: MatDialog, private router: Router) {

  }

  // tslint:disable-next-line:typedef
  ngOnInit() {


  }




}


