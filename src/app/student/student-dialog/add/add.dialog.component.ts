import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Student} from "../../../tender/model/student.model";
import {StudentService} from "../../student.service";
import {NotificationService} from "../../../../shared/notification.service";



@Component({
  selector: 'app-add.dialog',

  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<AddDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Student,
               public studentService:StudentService, private notificationService: NotificationService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  // tslint:disable-next-line:typedef
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  // tslint:disable-next-line:typedef
  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.studentService.addPonude(this.data);
    this.notificationService.success('Dodato');
    // window.location.reload();
  }

  ngOnInit(): void {
  }
}
