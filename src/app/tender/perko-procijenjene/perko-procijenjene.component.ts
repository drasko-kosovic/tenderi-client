import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PrekoProcijenjene} from "../model/PrekoProcijenjene.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TenderService} from "../tender.service";

@Component({
  selector: 'app-perko-procijenjene',
  templateUrl: './perko-procijenjene.component.html',
  styleUrls: ['./perko-procijenjene.component.css']
})
export class PerkoProcijenjeneComponent implements OnInit {

  public displayedColumns = ['id', 'partija', 'atc', 'nazivProizvoda', 'procijenjenaJedinicnaCijena', 'ponudjenaJedinicnaCijena',
    'procijenjenaUkupnaCijena', 'ponudjenaUkupnaCijena', 'ponudjac', 'brojTendera'];

  public dataSource = new MatTableDataSource<PrekoProcijenjene>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tenderService: TenderService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAllPrekoProcijenjene();
  }

  // tslint:disable-next-line:typedef
  public getAllPrekoProcijenjene()  {
    this.tenderService.getPrekoProcijenjene()
      .subscribe(res => {
        this.dataSource.data = res as PrekoProcijenjene[];
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
