import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Ponude} from '../model/ponude.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TenderService} from '../tender.service';
import {Bodovanje} from '../model/bodovanje.model';

@Component({
  selector: 'app-tender-home',
  templateUrl: './tender-home.component.html',
  styleUrls: ['./tender-home.component.css']
})
export class TenderHomeComponent implements OnInit, AfterViewInit {

  public displayedColumnsBodovanje = ['id', 'partija', 'atc', 'nazivProizvoda', 'zasticeniNaziv', 'proizvodjac',
    'jedinicaMjere', 'trazenaKolicina', 'ponudjanaKolicina', 'procijenjenaJedinicnaCijena', 'ponudjenaJedinicnaCijena',
    'procijenjenaUkupnaCijena', 'ponudjenaUkupnaCijena', 'rokIsporuke' , 'ponudjac', 'brojTendera', 'bod_cijena', 'bod_isporuka', 'bod_ukupno'];

  public displayedColumns = ['id', 'partija', 'atc', 'nazivProizvoda', 'zasticeniNaziv', 'proizvodjac',
    'jedinicaMjere', 'trazenaKolicina', 'ponudjanaKolicina', 'procijenjenaJedinicnaCijena', 'ponudjenaJedinicnaCijena',
    'procijenjenaUkupnaCijena', 'ponudjenaUkupnaCijena', 'rokIsporuke' , 'ponudjac', 'brojTendera', 'actions'];
  public dataSource1 = new MatTableDataSource<Ponude>();
  public dataSource2 = new MatTableDataSource<Bodovanje>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tenderService: TenderService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAllOwners();
    this.getAllBodovanje();
  }
  // tslint:disable-next-line:typedef
  private getAllBodovanje()  {
    this.tenderService.getBodovanje()
      .subscribe(res => {
        this.dataSource2.data = res as Bodovanje[];
      });
  }
  // tslint:disable-next-line:typedef
  public getAllOwners()  {
    this.tenderService.getData()
      .subscribe(res => {
        this.dataSource1.data = res as Ponude[];
      });
  }

  ngAfterViewInit(): void {
    this.dataSource1.sort = this.sort;
    this.dataSource1.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  }

  public doFilter = (value: string) => {
    this.dataSource1.filter = value.trim().toLocaleLowerCase();
  }

}
