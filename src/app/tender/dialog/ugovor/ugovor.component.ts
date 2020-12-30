import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ugovor',
  templateUrl: './ugovor.component.html',
  styleUrls: ['./ugovor.component.css'],
})
export class UgovorComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UgovorComponent>) {}

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    // this.tenderService.updatePonude(this.data);
    // // window.location.reload();
    // this.notificationService.success(' Zapis je promjenjen uspjesno');
  }

  ngOnInit(): void {}
}
