import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {TenderService} from '../tender.service';
import {Ponude} from '../model/ponude.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TableUtilPonudeUser} from './table-util-ponude-user';

@Component({
  selector: 'app-ponude-user',
  templateUrl: './ponude-user.component.html',
  styleUrls: ['./ponude-user.component.css']
})
export class PonudeUserComponent implements OnInit, OnChanges {

  public displayedColumns = ['partija', 'atc', 'naziv_proizvoda', 'zasticeni_naziv', 'proizvodjac',
    'farmaceutski_oblik', 'pakovanje', 'trazena_kolicina', 'ponudjana_kolicina', 'procijenjena_jedinicna_cijena', 'ponudjena_jedinicna_cijena',
    'procijenjena_ukupna_cijena', 'ponudjena_ukupna_cijena', 'rok_isporuke', 'ponudjac', 'broj_tendera'];
  public dataSource = new MatTableDataSource<Ponude>();
  exampleDatabase: TenderService | null;
  index: number;
  id: number;
  checked = false;
  ukupnoProcijenjena: number;
  ukupnaPonudjena: number;
  show = true;
  broj_tendera=false;

  timeLeft: number = 1;
  interval;
  @Input() tender: string;
  @Input() ponnudjac: string;

  // brojTendera:string ='1120';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild('filter', {static: true}) filter: ElementRef;


  constructor(private tenderService: TenderService) {

  }
  ngOnInit() {
  }


  public getAllPonude() {

    this.tenderService.getFindByTenderi(this.tender)
      .subscribe(res => {
        this.dataSource.data = res as Ponude[];
        console.log('to je   ' + res);

      });


  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  };


  // calculation() {
  //   let sum = 0;
  //   if (this.dataSource) {
  //     for (const row of this.dataSource.data) {
  //       // tslint:disable-next-line:triple-equals
  //       if (row.id != 0) { sum += row.ponudjenaUkupnaCijena; }
  //     }
  //   }
  //   return sum;
  // }



  doFilter() {
    this.dataSource.filter = this.ponnudjac.trim().toLocaleLowerCase();
    this.ukupnoProcijenjena = this.dataSource.filteredData.map(t => t.procijenjena_ukupna_cijena).reduce((acc, value) => acc + value, 0);
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjena_ukupna_cijena).reduce((acc, value) => acc + value, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllPonude();
    // @ts-ignore
    this.doFilter();
  }


  hide() {
    this.show = false;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft = 2) {
        this.show=true;
      } else {
        console.log("nije isteklo");
      }
    },1000)
  }
  exportTable() {

    TableUtilPonudeUser.exportToPdf('ExampleTable');
    this.startTimer();
  }
}
