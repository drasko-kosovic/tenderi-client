import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ponude } from '../model/ponude.model';
import { TableUtilPonudeUser } from '../ponude-user/table-util-ponude-user';
import { TenderService } from '../tender.service';

@Component({
  selector: 'app-ugovorene-ponude',
  templateUrl: './ugovorene-ponude.component.html',
  styleUrls: ['./ugovorene-ponude.component.css']
})
export class UgovorenePonudeComponent implements OnInit, OnChanges {

  public displayedColumns = ['partija', 'atc', 'naziv_proizvoda', 'zasticeni_naziv', 'proizvodjac',
    'ponudjana_kolicina', 'ponudjena_jedinicna_cijena',
    'ponudjena_ukupna_cijena', 'ponudjac', 'broj_tendera','broj_ugovora','datum_ugovora'];


  public dataSource = new MatTableDataSource<Ponude>();
  exampleDatabase: TenderService | null;
  index: number;
  id: number;
  checked = false;
  ukupnoProcijenjena: number;
  ukupnaPonudjena: number;
  show = true;
  broj_tendera = false;



  @Input() tender: number;
  @Input() ponnudjac: string;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private tenderService: TenderService) {

  }
  ngOnInit() {

  }


  public getAllPonude() {

    this.tenderService.getPrvorangiraniFindByTenderi(this.tender)
      .subscribe(res => {
        this.dataSource.data = res as Ponude[];
        console.log('to je   ' + res);

      });


  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event: any) => {
    console.log(event);
  };


  doFilter() {
    this.dataSource.filter = this.ponnudjac.trim().toLocaleLowerCase();
    this.ukupnoProcijenjena = this.dataSource.filteredData.map(t => t.procijenjena_ukupna_cijena).reduce((acc, value) => acc + value, 0);
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjena_ukupna_cijena).reduce((acc, value) => acc + value, 0);
  }

  ngOnChanges(): void {
    this.getAllPonude();
    this.doFilter();
  }

  exportTable() {

    TableUtilPonudeUser.exportToPdf('ExampleTable');

  }
  refresh() {
    this.getAllPonude();
  }

  
  }

