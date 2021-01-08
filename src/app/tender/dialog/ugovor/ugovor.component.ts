import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TenderService } from '../../tender.service';
import { NotificationService } from '../../../../shared/notification.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ugovor',
  templateUrl: './ugovor.component.html',
  styleUrls: ['./ugovor.component.scss'],
})
export class UgovorComponent implements OnInit {
  form: any;
  constructor(
    public dialogRef: MatDialogRef<UgovorComponent>,
    private tenderService: TenderService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      broj_ugovora: ['', [Validators.required]],
      broj_tendera: ['', [Validators.required]],
      ponudjac: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
   
  }

  submit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  putUgovor() {
    this.tenderService.putUgovor(this.form.value.broj_ugovora, this.form.value.broj_tendera, this.form.value.ponudjac).subscribe(
      () => {
        console.log('uspjesno dodat zapis');
        this.notificationService.success('Uspjesno dodat');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
