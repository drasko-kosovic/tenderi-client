import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TenderService} from '../tender.service';
import {Ponude} from '../model/ponude.model';
import {DeleteDialogComponent} from '../dialog/delete/delete.dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AddDialogComponent} from '../dialog/add/add.dialog.component';
import {EditComponent} from '../dialog/edit/edit.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {TableUtilPonude} from './table-util-ponude';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.css']
})
export class PonudeComponent implements OnInit, OnChanges {

  public displayedColumns = ['partija', 'atc', 'nazivProizvoda', 'zasticeniNaziv', 'proizvodjac',
    'farmaceutskiOblik', 'pakovanje', 'trazenaKolicina', 'ponudjanaKolicina', 'procijenjenaJedinicnaCijena', 'ponudjenaJedinicnaCijena',
    'procijenjenaUkupnaCijena', 'ponudjenaUkupnaCijena', 'rokIsporuke', 'ponudjac', 'brojTendera', 'dodaj', 'delete sve', 'selected'];
  public dataSource = new MatTableDataSource<Ponude>();
  exampleDatabase: TenderService | null;
  index: number;
  id: number;
  checked = false;
  ukupnoProcijenjena: number;
  ukupnaPonudjena: number;
  show = true;
  @Input() tender: string;
  @Input() ponnudjac: string;

  // brojTendera:string ='1120';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter', {static: true}) filter: ElementRef;


  constructor(private tenderService: TenderService, public dialog: MatDialog) {

  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // this.getAllPonude();

  }


  public getAllPonude() {

    this.tenderService.getFindByTenderi(this.tender)
      .subscribe(res => {
        this.dataSource.data = res as Ponude[];
        console.log('to je   ' + res);
        // console.log(this.brojTendera);
      });


  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  };


  // tslint:disable-next-line:typedef
  // doFilter(fitlervalue: string) {
  //   this.dataSource.filter = fitlervalue.trim().toLocaleLowerCase();
  //   this.ukupno = this.dataSource.filteredData.map(t => t.ponudjenaUkupnaCijena).reduce((acc, value) => acc + value, 0);
  // }

  // tslint:disable-next-line:typedef
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

  // tslint:disable-next-line:typedef
  deleteItem(i: number, id: number) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id}
    });

  }


  // tslint:disable-next-line:typedef
  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {Ponude: {}}
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

  startEdit(i: number, id: number, partija: string, atc: string, nazivProizvoda: string, zasticeniNaziv: string, proizvodjac:
    string, jedinicaMjere: string, trazenaKolicina: string, ponudjanaKolicina: number, procijenjenaJedinicnaCijena:
              number, ponudjenaJedinicnaCijena: number, procijenjenaUkupnaCijena: number, ponudjenaUkupnaCijena: number, rokIsporuke:
              number, ponudjac: string, brojTendera: string
  ) {
    this.id = id;
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        id,
        partija,
        atc,
        nazivProizvoda,
        zasticeniNaziv,
        proizvodjac,
        jedinicaMjere,
        trazenaKolicina,
        ponudjanaKolicina,
        procijenjenaJedinicnaCijena,
        ponudjenaJedinicnaCijena,
        procijenjenaUkupnaCijena,
        ponudjenaUkupnaCijena,
        rokIsporuke,
        ponudjac,
        brojTendera
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
    this.ukupnoProcijenjena = this.dataSource.filteredData.map(t => t.procijenjenaUkupnaCijena).reduce((acc, value) => acc + value, 0);
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjenaUkupnaCijena).reduce((acc, value) => acc + value, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllPonude();
    // @ts-ignore
    this.doFilter();
  }

  generatePdf() {
    const documentDefinition = {content: 'This is for testing.'};
    // pdfMake.createPdf(documentDefinition).print();
    // pdfMake.createPdf(docDefinition).print();
    pdfMake.createPdf(documentDefinition).open({}, window);
  }

  hide(){
    this.show = false;
  }
  exportTable() {



    TableUtilPonude.exportToPdf('ExampleTable');
  }

}
