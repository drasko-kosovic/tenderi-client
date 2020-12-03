import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Ponude} from '../model/ponude.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TenderService} from '../tender.service';
import {Bodovanje} from '../model/bodovanje.model';

@Component({
  selector: 'app-bodovanje',
  templateUrl: './bodovanje.component.html',
  styleUrls: ['./bodovanje.component.css']
})
export class BodovanjeComponent implements OnInit, AfterViewInit,OnChanges {
  @Input() tender: string;
  public displayedColumns = ['id', 'partija', 'atc', 'nazivProizvoda', 'zasticeniNaziv', 'proizvodjac',
    'jedinicaMjere', 'trazenaKolicina', 'ponudjanaKolicina', 'procijenjenaJedinicnaCijena', 'ponudjenaJedinicnaCijena',
    'procijenjenaUkupnaCijena', 'ponudjenaUkupnaCijena', 'rokIsporuke' , 'ponudjac', 'brojTendera', 'bod_cijena', 'bod_isporuka', 'bod_ukupno'];
  public dataSource = new MatTableDataSource<Bodovanje>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tenderService: TenderService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // this.getAllBodovanje();
  }

  // tslint:disable-next-line:typedef
  public getAllBodovanje()  {
    this.tenderService.getBodovanjeFindByTenderi(this.tender)
      .subscribe(res => {
        this.dataSource.data = res as Bodovanje[];
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

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllBodovanje();
  }

}
