import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TenderService } from '../tender.service';
import { Ponude } from '../model/ponude.model';
import { DeleteDialogComponent } from '../dialog/delete/delete.dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../dialog/add/add.dialog.component';
import { EditComponent } from '../dialog/edit/edit.component';
import pdfMake from 'pdfmake/build/pdfmake';
import { TableUtilPonude } from './table-util-ponude';



@Component({
  selector: 'app-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.css']
})
export class PonudeComponent implements OnInit, OnChanges {

  public displayedColumns = ['partija', 'atc', 'naziv_proizvoda', 'zasticeni_naziv', 'proizvodjac',
    'farmaceutski_oblik', 'pakovanje', 'trazena_kolicina', 'ponudjana_kolicina', 'procijenjena_jedinicna_cijena', 'ponudjena_jedinicna_cijena',
    'procijenjena_ukupna_cijena', 'ponudjena_ukupna_cijena', 'rok_isporuke', 'ponudjac', 'broj_tendera', 'dodaj', 'delete sve', 'selected'];
  public dataSource = new MatTableDataSource<Ponude>();
  exampleDatabase: TenderService | null;
  index: number;
  id: number;
  checked = false;
  ukupnoProcijenjena: number;
  ukupnaPonudjena: number;
  show = true;
  broj_tendera = false;

  timeLeft: number = 1;
  interval;
  @Input() tender: number;
  @Input() ponnudjac: string;

  // brojTendera:string ='1120';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter', { static: true }) filter: ElementRef;


  constructor(private tenderService: TenderService, public dialog: MatDialog) {

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



  // doFilter(fitlervalue: string) {
  //   this.dataSource.filter = fitlervalue.trim().toLocaleLowerCase();
  //   this.ukupno = this.dataSource.filteredData.map(t => t.ponudjenaUkupnaCijena).reduce((acc, value) => acc + value, 0);
  // }


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


  deleteItem(i: number, id: number) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id }
    });

  }


  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { Ponude: {} }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 1) {
    //     // After dialog is closed we're doing frontend updates
    //     // For add we're just pushing a new row inside DataService
    //
    //     this.exampleDatabase.dataChange.value.push(this.tenderService.getDialogData());
    //     // this.refreshTable();
    //     // this.refresh();
    //   }
    // });
  }

  startEdit(i: number, id: number, partija: string, atc: string, naziv_proizvoda: string, zasticeni_naziv: string, proizvodjac:
    string, farmaceutski_oblik: string, trazena_kolicina: string, ponudjana_kolicina: number, procijenjena_jedinicna_cijena:
      number, ponudjena_jedinicna_cijena: number, procijenjena_ukupna_cijena: number, ponudjena_ukupna_cijena: number, rok_isporuke:
      number, ponudjac: string, broj_tendera: string
  ) {
    this.id = id;
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        id,
        partija,
        atc,
        naziv_proizvoda,
        zasticeni_naziv,
        proizvodjac,
        farmaceutski_oblik,
        trazena_kolicina,
        ponudjana_kolicina,
        procijenjena_jedinicna_cijena,
        ponudjena_jedinicna_cijena,
        procijenjena_ukupna_cijena,
        ponudjena_ukupna_cijena,
        rok_isporuke,
        ponudjac,
        broj_tendera
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // // When using an edit things are little different, firstly we find record inside DataService by id
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // // Then you update that record using data from dialogData (values you enetered)
        // this.exampleDatabase.dataChange.value[foundIndex] = this.tenderService.getDialogData();
        // // And lastly refresh table
        // // this.refreshTable();
        // // this.refresh();
        console.log('Updated podaci');
      }
    });
  }

  updateSelected(id: number) {

    this.tenderService.updatePersonSelected(id);
  }

  deleteSelected(): void {
    this.tenderService.deleteSelected();
    // this.refreshTable();
    // this.refresh();
  }


  doFilter() {
    this.dataSource.filter = this.ponnudjac.trim().toLocaleLowerCase();
    this.ukupnoProcijenjena = this.dataSource.filteredData.map(t => t.procijenjena_ukupna_cijena).reduce((acc, value) => acc + value, 0);
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjena_ukupna_cijena).reduce((acc, value) => acc + value, 0);
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.getAllPonude();

    this.doFilter();
  }


  hide() {
    this.show = false;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft = 2) {
        this.show = true;
      } else {
        console.log("nije isteklo");
      }
    }, 1000)
  }
  exportTable() {

    TableUtilPonude.exportToPdf('ExampleTable');
    this.startTimer();
  }

}
