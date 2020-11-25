import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Owner} from '../model/owner.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TenderService} from '../tender.service';

@Component({
  selector: 'app-ponude',

  templateUrl: './ponude.component.html',

  styleUrls: ['./ponude.component.css']
})
export class PonudeComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['name', 'dateOfBirth', 'address'];
  public dataSource = new MatTableDataSource<Owner>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private repoService: TenderService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAllOwners();
  }

  // tslint:disable-next-line:typedef
  public getAllOwners()  {
    this.repoService.getData()
      .subscribe(res => {
        this.dataSource.data = res as Owner[];
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
