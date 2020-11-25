import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Owner} from '../model/owner.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TenderService} from '../tender.service';
import {Ponude} from '../model/ponude.model';

@Component({
  selector: 'app-ponude',

  templateUrl: './ponude.component.html',

  styleUrls: ['./ponude.component.css']
})
export class PonudeComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['id', 'partija', 'atc', 'nazivProizvoda', 'zasticeniNaziv', 'proizvodjac',
  'jedinicaMjere', 'trazenaKolicina', 'ponudjanaKolicina', 'procijenjenaJedinicnaCijena', 'ponudjenaJedinicnaCijena',
  'procijenjenaUkupnaCijena', 'ponudjenaUkupnaCijena', 'rokIsporuke' , 'ponudjac', 'brojTendera', 'actions'];
  public dataSource = new MatTableDataSource<Ponude>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tenderService: TenderService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAllOwners();
  }

  // tslint:disable-next-line:typedef
  public getAllOwners()  {
    this.tenderService.getData()
      .subscribe(res => {
        this.dataSource.data = res as Ponude[];
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // tslint:disable-next-line:typedef
  calculation() {
    let sum = 0;
    if (this.dataSource) {
      for (const row of this.dataSource.data) {
        // tslint:disable-next-line:triple-equals
        if (row.id != 0) sum += row.ponudjenaUkupnaCijena;
      }
    }
    return sum;
  }

}
