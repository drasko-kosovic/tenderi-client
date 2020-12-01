import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Bodovanje} from '../model/bodovanje.model';
import {TenderService} from '../tender.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-prvorangirani',
  templateUrl: './prvorangirani.component.html',
  styleUrls: ['./prvorangirani.component.css']
})
export class PrvorangiraniComponent implements OnInit , AfterViewInit {

  public displayedColumns = ['id', 'partija', 'atc', 'nazivProizvoda', 'zasticeniNaziv', 'proizvodjac',
    'jedinicaMjere', 'trazenaKolicina', 'ponudjanaKolicina', 'procijenjenaJedinicnaCijena', 'ponudjenaJedinicnaCijena',
    'procijenjenaUkupnaCijena', 'ponudjenaUkupnaCijena', 'rokIsporuke' , 'ponudjac', 'brojTendera', 'bod_cijena', 'bod_isporuka', 'bod_ukupno'];
  public dataSource = new MatTableDataSource<Bodovanje>();
  @Input() tender: string;
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

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }




}
