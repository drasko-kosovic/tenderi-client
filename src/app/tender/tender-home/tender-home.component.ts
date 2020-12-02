import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {TokenStorageService} from "../../auth/login/_services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tender-home',

  templateUrl: './tender-home.component.html',
  styleUrls: ['./tender-home.component.css']
})
export class TenderHomeComponent implements OnInit {
  isLoggedIn = false;
  private roles: string[];
  private brojTendera='1020';
  constructor( private tokenStorageService: TokenStorageService, private router: Router) {

  }
  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;



    }
  }

  OnKeyUp(){
    console.log('to je     ' +this.brojTendera);
  }

}
