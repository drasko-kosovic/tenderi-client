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

  
 
  @Input() tender: string;
  @Input() ponnudjac: string;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;



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

  public customSort = (event:any) => {
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

  // private refreshTable() {
  //   this.paginator.changePpartijaSize(this.paginator.firstPage);
  // }

  doFilter() {
    this.dataSource.filter = this.ponnudjac.trim().toLocaleLowerCase();
    this.ukupnoProcijenjena = this.dataSource.filteredData.map(t => t.procijenjena_ukupna_cijena).reduce((acc, value) => acc + value, 0);
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjena_ukupna_cijena).reduce((acc, value) => acc + value, 0);
  }

  ngOnChanges(): void {
    this.getAllPonude();
      this.doFilter();
  }

  exportTable() {

    TableUtilPonudeUser.exportToPdf('ExampleTable');
   
  }
  refresh() {
    this.getAllPonude();
  }

  sortData(data: Ponude[]): Ponude[] {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this.sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'partija': [propertyA, propertyB] = [a.partija, b.partija]; break;
        // case 'country': [propertyA, propertyB] = [a.country, b.country]; break;
        // case 'firstName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;
        // case 'lastName': [propertyA, propertyB] = [a.lastName, b.lastName]; break;

      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
    });
  }
}
