import {AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Bodovanje} from '../model/bodovanje.model';
import {TenderService} from '../tender.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TableUtilPonude} from '../ponude/table-util-ponude';
import {TableUtilPrvorangirani} from './table-util-prvorangirani';

@Component({
  selector: 'app-prvorangirani',
  templateUrl: './prvorangirani.component.html',
  styleUrls: ['./prvorangirani.component.css']
})
export class PrvorangiraniComponent implements OnInit , AfterViewInit {

  public displayedColumns = ['partija', 'atc', 'naziv_proizvoda', 'zasticeni_naziv', 'proizvodjac',
  'farmaceutski_oblik', 'pakovanje', 'trazena_kolicina', 'ponudjana_kolicina', 'procijenjena_jedinicna_cijena', 'ponudjena_jedinicna_cijena',
  'procijenjena_ukupna_cijena', 'ponudjena_ukupna_cijena', 'rok_isporuke', 'ponudjac', 'broj_tendera'];
  public dataSource = new MatTableDataSource<Bodovanje>();
  @Input() tender: number;
  @Input() ponnudjac:string;

  ukupnoProcijenjena:number;
  ukupnaPonudjena:number;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tenderService: TenderService) { }

 
  ngOnInit() {
    this.getAllPrvorangirani();
  }

 
  public getAllPrvorangirani()  {
    this.tenderService.getPrvorangiraniFindByTenderi(this.tender)
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
    this.getAllPrvorangirani();
    // @ts-ignore;
    this.doFilter();
  }

  exportTablePrvorangirani() {


    TableUtilPrvorangirani.exportToPdf('ExampleTable');
  }

}
