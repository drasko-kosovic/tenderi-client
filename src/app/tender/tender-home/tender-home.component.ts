import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Ponude} from '../model/ponude.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TenderService} from '../tender.service';
import {Bodovanje} from '../model/bodovanje.model';

@Component({
  selector: 'app-tender-home',

  templateUrl: './tender-home.component.html',
  styleUrls: ['./tender-home.component.css']
})
export class TenderHomeComponent  {
  brojTendera = '1020';

}
