import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Component, OnInit} from "@angular/core";
import {NotificationService} from "../../../shared/notification.service";
import {AuthService} from "./_services/auth.service";
import {TokenStorageService} from "./_services/token-storage.service";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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

  submit() {
    if (!this.form.valid) {
      return;
    }

    this.onSubmit();
    console.log(this.form.value);
  }



  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
    }
   
  }

  
  onSubmit() {
   
    this.authService.login(this.form.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.notificationService.success('Uspesno ste se priavili');
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
         console.log('Nije ulogovan');
      }
    );
  }




  reloadPage() {
    window.location.reload();
  }
}


