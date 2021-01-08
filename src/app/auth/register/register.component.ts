import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/notification.service';
import { AuthService } from '../login/_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  form: FormGroup;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.authService.register(this.form.value).subscribe(
      (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.notificationService.success(':: Submitted successfully');
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
