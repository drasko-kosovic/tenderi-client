import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PrekoProcijenjene} from "../model/PrekoProcijenjene.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TenderService} from "../tender.service";
import {HvalePartije} from "../model/HvalePartije";

@Component({
  selector: 'app-hvale-partije',
  templateUrl: './hvale-partije.component.html',
  styleUrls: ['./hvale-partije.component.css']
})
export class HvalePartijeComponent implements OnInit {

  public displayedColumns = ['id', 'partija', 'brojTendera'];

  public dataSource = new MatTableDataSource<HvalePartije>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tenderService: TenderService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAllPrekoProcijenjene();
  }

  // tslint:disable-next-line:typedef
  public getAllPrekoProcijenjene()  {
    this.tenderService.getHvalePartije()
      .subscribe(res => {
        this.dataSource.data = res as HvalePartije[];
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
