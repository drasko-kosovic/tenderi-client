import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements AfterViewInit, OnInit {
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
    'actions',
  ];
  public dataSource = new MatTableDataSource<Ponude>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  id: number;

  constructor(
    private tenderService: TenderService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllPonude();
  }
  public getAllPonude() {
    this.tenderService.getFindByTenderi(1620).subscribe((res) => {
      this.dataSource.data = res as Ponude[];
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: number) {
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

  updateEdit(
    id:number,
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
}
