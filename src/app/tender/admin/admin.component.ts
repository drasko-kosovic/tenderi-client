import {
  Component,
  ElementRef,
  OnInit,
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

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
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
  ukupnoProcijenjena: number;
  ukupnaPonudjena: number;
 
  
 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(private tenderService: TenderService, public dialog: MatDialog) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
   this.getAllPonude();
  }

  public getAllPonude() {
    this.tenderService.getFindByTenderi(1620).subscribe((res) => {
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteItem(i: number, id: number) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id },
    });
  }
}