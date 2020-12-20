import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PrekoProcijenjene} from "../model/PrekoProcijenjene.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TenderService} from "../tender.service";
import {HvalePartije} from "../model/HvalePartije";
import {TableUtilPrekoprocijenjene} from '../perko-procijenjene/table-util-prekoprocijenjene';
import {TableUtilHvale} from './table-util-hvale';

@Component({
  selector: 'app-hvale-partije',
  templateUrl: './hvale-partije.component.html',
  styleUrls: ['./hvale-partije.component.css']
})
export class HvalePartijeComponent implements OnInit {

  public displayedColumns = ['id', 'partija','naziv_proizvoda','farmaceutski_oblik','pakovanje','trazena_kolicina','procijenjena_jedinicna_cijena','procijenjena_ukupna_cijena', 'brojTendera'];

  public dataSource = new MatTableDataSource<HvalePartije>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() tender: string;


  ukupnoProcijenjena:number;
  ukupnaPonudjena:number;
  constructor(private tenderService: TenderService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAllHvalePartije();
  }

  // tslint:disable-next-line:typedef
  public getAllHvalePartije()  {
    this.tenderService.getHvalePartijeFindByTenderi(this.tender)
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

  doFilter() {
    this.dataSource.filter = this.tender.trim().toLocaleLowerCase();
    this.ukupnoProcijenjena = this.dataSource.filteredData.map(t => t.procijenjena_ukupna_cijena).reduce((acc, value) => acc + value, 0);
   
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.getAllHvalePartije();
    // @ts-ignore
    // this.doFilter();
  }

  exportTableHvale() {


    TableUtilHvale.exportToPdf('ExampleTable');
  }

}
