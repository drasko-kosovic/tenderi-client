import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Owner} from '../model/owner.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TenderService} from '../tender.service';
import {Ponude} from '../model/ponude.model';
import {DeleteDialogComponent} from '../dialog/delete/delete.dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AddDialogComponent} from '../dialog/add/add.dialog.component';


@Component({
  selector: 'app-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.css']
})
export class PonudeComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['id', 'partija', 'atc', 'nazivProizvoda', 'zasticeniNaziv', 'proizvodjac',
    'jedinicaMjere', 'trazenaKolicina', 'ponudjanaKolicina', 'procijenjenaJedinicnaCijena', 'ponudjenaJedinicnaCijena',
    'procijenjenaUkupnaCijena', 'ponudjenaUkupnaCijena', 'rokIsporuke', 'ponudjac', 'brojTendera', 'actions'];
  public dataSource = new MatTableDataSource<Ponude>();
  exampleDatabase: TenderService | null;
  index: number;
  id: number;
  checked = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter', {static: true}) filter: ElementRef;


  constructor(private tenderService: TenderService, public dialog: MatDialog) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAllOwners();
  }

  // tslint:disable-next-line:typedef
  public getAllOwners() {
    this.tenderService.getData()
      .subscribe(res => {
        this.dataSource.data = res as Ponude[];
        console.log(res);
      });


  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  }

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
      data: {Ponude: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService

        this.exampleDatabase.dataChange.value.push(this.tenderService.getDialogData());
        // this.refreshTable();
        // this.refresh();
      }
    });
  }

}
