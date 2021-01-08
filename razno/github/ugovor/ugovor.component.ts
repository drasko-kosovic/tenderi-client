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

  submit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {}

  ngOnInit(): void {}

  putUgovor() {
    this.tenderService.putUgovor('900', 1620, 'glosarij').subscribe(
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
