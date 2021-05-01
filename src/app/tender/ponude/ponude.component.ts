import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TenderService } from '../tender.service';
import { Ponude } from '../model/ponude.model';
import { DeleteDialogComponent } from '../dialog/delete/delete.dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../dialog/add/add.dialog.component';
import { EditComponent } from '../dialog/edit/edit.component';


@Component({
  selector: 'app-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.scss'],
})
export class PonudeComponent implements OnChanges {
  public displayedColumns = [
    'partija',
    'atc',
    'naziv_proizvoda',
    'zasticeni_naziv',
    'proizvodjac',
    'farmaceutski_oblik',
    'pakovanje',
    'trazena_kolicina',
    'ponudjana_kolicina',
    'procijenjena_jedinicna_cijena',
    'ponudjena_jedinicna_cijena',
    'procijenjena_ukupna_cijena',
    'ponudjena_ukupna_cijena',
    'rok_isporuke',
    'ponudjac',
    'broj_tendera',
    'dodaj',
    'delete sve',
    'selected',
  ];
  public dataSource = new MatTableDataSource<Ponude>();
  exampleDatabase: TenderService | null;
  index: number;
  id: number;
  checked = false;
  ukupnoProcijenjena: number;
  ukupnaPonudjena: number;
  show = true;
  // tslint:disable-next-line:variable-name
  broj_tendera = false;

  @Input() tender: number;
  @Input() ponnudjac: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(private tenderService: TenderService, public dialog: MatDialog) {}



  public getAllPonude(): void {
    this.tenderService.getFindByTenderi(this.tender).subscribe((res) => {
      this.dataSource.data = res as Ponude[];
      console.log('to je   ' + res);
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  }

  deleteItem(i: number, id: number) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id },
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { Ponude: {} },
    });
  }

  startEdit(
    i: number,
    id: number,
    partija: string,
    atc: string,
    naziv_proizvoda: string,
    zasticeni_naziv: string,
    proizvodjac: string,
    farmaceutski_oblik: string,
    trazena_kolicina: string,
    ponudjana_kolicina: number,
    procijenjena_jedinicna_cijena: number,
    ponudjena_jedinicna_cijena: number,
    procijenjena_ukupna_cijena: number,
    ponudjena_ukupna_cijena: number,
    rok_isporuke: number,
    ponudjac: string,
    broj_tendera: string
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
        broj_tendera,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        console.log('Updated podaci');
      }
    });
  }

  updateSelected(id: number) {
    this.tenderService.updatePersonSelected(id);
  }

  deleteSelected(): void {
    this.tenderService.deleteSelected();
  }

  doFilter() {
    this.dataSource.filter = this.ponnudjac.trim().toLocaleLowerCase();
    this.ukupnoProcijenjena = this.dataSource.filteredData
      .map((t) => t.procijenjena_ukupna_cijena)
      .reduce((acc, value) => acc + value, 0);
    this.ukupnaPonudjena = this.dataSource.filteredData
      .map((t) => t.ponudjena_ukupna_cijena)
      .reduce((acc, value) => acc + value, 0);
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.getAllPonude();

    this.doFilter();
  }



  }

