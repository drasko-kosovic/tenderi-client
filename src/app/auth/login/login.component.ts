

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {NotificationService} from '../../../shared/notification.service';




@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  hide = true;
  username: string[] = [];



  // tslint:disable-next-line:max-line-length
  constructor( private notificationService: NotificationService, private fb: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router)
  {
      this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]


    });

  }

  // tslint:disable-next-line:typedef
  submit() {
    if (!this.form.valid) {
      return;
    }

    this.onSubmit();
    console.log(this.form.value);
  }



  // tslint:disable-next-line:typedef
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
    }
    // this.onSubmit();
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    // this.authService.login(this.form.value.username,this.form.value.password).subscribe(
    this.authService.login(this.form.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.notificationService.success(':: Submitted successfully');
        console.log('Ulogovan');
        this.roles = this.tokenStorage.getUser().roles;
        this.username = this.tokenStorage.getUser().username;

        // this.router.navigate(['']);
        console.log('ulogovan');
        console.log(this.form.value.username);
        this.reloadPage();

        // this.router.navigate(['/']);



      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        // this.poruka="{{'login.form.button'|translate}}";
        // this.toastr.warning('Neuspjesno logovan');
        console.log('Nije ulogovan');
      }
    );
  }



  // tslint:disable-next-line:typedef
  reloadPage() {
    window.location.reload();
  }
}

