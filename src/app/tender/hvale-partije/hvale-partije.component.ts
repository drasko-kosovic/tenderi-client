import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PrekoProcijenjene} from "../model/PrekoProcijenjene.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TenderService} from "../tender.service";
import {HvalePartije} from "../model/HvalePartije";

@Component({
  selector: 'app-hvale-partije',
  templateUrl: './hvale-partije.component.html',
  styleUrls: ['./hvale-partije.component.css']
})
export class HvalePartijeComponent implements OnInit {

  public displayedColumns = ['id', 'partija','atc','nazivProizvoda','farmaceutskiOblik','pakovanje','trazena_kolicina','procijenjenaJedinicnaCijena','procijenjenaUkupnaCijena', 'brojTendera'];

  public dataSource = new MatTableDataSource<HvalePartije>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() tender: string;


  ukupnoProcijenjena:number;
  ukupnaPonudjena:number;
  constructor(private tenderService: TenderService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAllHvalePartije();
  }

  // tslint:disable-next-line:typedef
  public getAllHvalePartije()  {
    this.tenderService.getHvalePartijeFindByTenderi(this.tender)
      .subscribe(res => {
        this.dataSource.data = res as HvalePartije[];
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  }

  // doFilter() {
    // this.dataSource.filter = this.ponnudjac.trim().toLocaleLowerCase();
    // this.ukupnoProcijenjena = this.dataSource.filteredData.map(t => t.procijenjenaUkupnaCijena).reduce((acc, value) => acc + value, 0);
    // this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjenaUkupnaCijena).reduce((acc, value) => acc + value, 0);
    //
  // }


  ngOnChanges(changes: SimpleChanges): void {
    this.getAllHvalePartije();
    // @ts-ignore
    // this.doFilter();
  }

}
