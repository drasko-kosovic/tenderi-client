import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TenderService } from '../../tender.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public tenderService: TenderService,
    private notificationService: NotificationService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateEdit(): void {
    this.tenderService.updatePonude(this.data);
    window.location.reload();
    this.notificationService.success(' Zapis je promjenjen uspjesno');
  }
}
