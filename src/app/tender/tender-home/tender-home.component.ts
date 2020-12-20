import {Component, OnInit} from '@angular/core';

import {TokenStorageService} from '../../auth/login/_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tender-home',

  templateUrl: './tender-home.component.html',
  styleUrls: ['./tender-home.component.css']
})
export class TenderHomeComponent implements OnInit {
  isLoggedIn = false;
  private roles: string[];
  public brojTendera = '1220';
  public imePonudjaca = '';
  currentUser: any;
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {

  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

    }

  }


  OnKeyUp() {
    console.log('to je     ' + this.brojTendera);
    console.log('to je     ' + this.imePonudjaca);
  }

  onClean(){
    this.brojTendera = '';
    window.location.reload();
  }

  onCleanPonudjaci() {
    this.imePonudjaca = '';
  }
}
