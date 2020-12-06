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
  @Input() ponnudjac:string;

  ukupnoProcijenjena:number;
  ukupnaPonudjena:number;
  public displayedColumns = ['partija', 'atc', 'nazivProizvoda', 'zasticeniNaziv', 'proizvodjac',
    'farmaceutskiOblik','pakovanje', 'trazenaKolicina', 'ponudjanaKolicina', 'procijenjenaJedinicnaCijena', 'ponudjenaJedinicnaCijena',
    'procijenjenaUkupnaCijena', 'ponudjenaUkupnaCijena', 'rokIsporuke', 'ponudjac', 'brojTendera', 'bod_cijena', 'bod_isporuka', 'bod_ukupno'];
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

  doFilter() {
    this.dataSource.filter = this.ponnudjac.trim().toLocaleLowerCase();
    this.ukupnoProcijenjena = this.dataSource.filteredData.map(t => t.procijenjenaUkupnaCijena).reduce((acc, value) => acc + value, 0);
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjenaUkupnaCijena).reduce((acc, value) => acc + value, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllBodovanje();
    // @ts-ignore
    this.doFilter();
  }

}
