import {AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Bodovanje} from '../model/bodovanje.model';
import {TenderService} from '../tender.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TableUtilPonude} from '../ponude/table-util-ponude';
import {TableUtilPrvorangirani} from './table-util-prvorangirani';

@Component({
  selector: 'app-prvorangirani',
  templateUrl: './prvorangirani.component.html',
  styleUrls: ['./prvorangirani.component.css']
})
export class PrvorangiraniComponent implements OnInit , AfterViewInit {

  public displayedColumns = ['partija', 'atc', 'nazivProizvoda', 'zasticeniNaziv', 'proizvodjac',
    'farmaceutskiOblik','pakovanje', 'trazenaKolicina', 'ponudjanaKolicina', 'procijenjenaJedinicnaCijena', 'ponudjenaJedinicnaCijena',
    'procijenjenaUkupnaCijena', 'ponudjenaUkupnaCijena', 'rokIsporuke', 'ponudjac', 'brojTendera', 'bod_cijena', 'bod_isporuka', 'bod_ukupno'];
  public dataSource = new MatTableDataSource<Bodovanje>();
  @Input() tender: string;
  @Input() ponnudjac:string;

  ukupnoProcijenjena:number;
  ukupnaPonudjena:number;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tenderService: TenderService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAllPrvorangirani();
  }

  // tslint:disable-next-line:typedef
  public getAllPrvorangirani()  {
    this.tenderService.getPrvorangiraniFindByTenderi(this.tender)
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
    this.getAllPrvorangirani();
    // @ts-ignore;
    this.doFilter();
  }

  exportTablePrvorangirani() {


    TableUtilPrvorangirani.exportToPdf('ExampleTable');
  }

}
