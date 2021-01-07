import { Component, OnInit } from '@angular/core';
export interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
