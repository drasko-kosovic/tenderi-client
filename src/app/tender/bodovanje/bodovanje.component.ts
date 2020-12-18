import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Ponude} from '../model/ponude.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TenderService} from '../tender.service';
import {Bodovanje} from '../model/bodovanje.model';
import {TableUtilBodovanje} from './table-util-bodovanje';
// import {TableUtilBodovanje} from "./tableUtilBodovanje";


@Component({
  selector: 'app-bodovanje',
  templateUrl: './bodovanje.component.html',
  styleUrls: ['./bodovanje.component.css']
})
export class BodovanjeComponent implements OnInit, AfterViewInit,OnChanges {
  @Input() tender: string;
  @Input() ponnudjac:string;

  ukupnoProcijenjena:number;
  ukupnaPonudjena:number;
  public displayedColumns = ['partija', 'atc', 'naziv_proizvoda', 'zasticeni_naziv', 'proizvodjac',
  'farmaceutski_oblik', 'pakovanje', 'trazena_kolicina', 'ponudjana_kolicina', 'procijenjena_jedinicna_cijena', 'ponudjena_jedinicna_cijena',
  'procijenjena_ukupna_cijena', 'ponudjena_ukupna_cijena', 'rok_isporuke', 'ponudjac', 'broj_tendera', 'bod_cijena', 'bod_isporuka', 'bod_ukupno'];
  public dataSource = new MatTableDataSource<Bodovanje>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tenderService: TenderService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // this.getAllBodovanje();
  }

  // tslint:disable-next-line:typedef
  public getAllBodovanje()  {
    this.tenderService.getBodovanjeFindByTenderi(this.tender)
      .subscribe(res => {
        this.dataSource.data = res as Bodovanje[];
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
    this.dataSource.filter = this.ponnudjac.trim().toLocaleLowerCase();
    this.ukupnoProcijenjena = this.dataSource.filteredData.map(t => t.procijenjena_ukupna_cijena).reduce((acc, value) => acc + value, 0);
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjena_ukupna_cijena).reduce((acc, value) => acc + value, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllBodovanje();
    // @ts-ignore
    this.doFilter();
  }
  exportTableBodovanje(){
    TableUtilBodovanje.exportToPdf("ExampleTable");
  }

}
