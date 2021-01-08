import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { TenderService } from '../../tender.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialog/delete/delete.dialog.html',
  styleUrls: ['./delete.dialog.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public tenderService: TenderService,
    private notificationService: NotificationService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.tenderService.deletePonuda(this.data.id);
    this.notificationService.success(' Zapis je obrisan');
    window.location.reload();
  }
}
