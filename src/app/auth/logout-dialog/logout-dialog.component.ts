import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

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
