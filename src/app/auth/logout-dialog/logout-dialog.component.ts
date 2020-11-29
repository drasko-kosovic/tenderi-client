import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from "../login/_services/token-storage.service";

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit, OnDestroy {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.tokenStorageService.signOut();

    this.router.navigate(['/']);

  }
refresh(){
    window.location.reload();
}
  ngOnDestroy(): void {

  }



}
