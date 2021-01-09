import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Ponude } from '../../model/ponude.model';
import { NotificationService } from '../../../../shared/notification.service';
import { TenderService } from '../../tender.service';

@Component({
  selector: 'app-add.dialog',

  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ponude,
    public tenderService: TenderService,
    private notificationService: NotificationService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.tenderService.addPonude(this.data);
    this.notificationService.success('Dodato');
    window.location.reload();
  }

  ngOnInit(): void {}
}
