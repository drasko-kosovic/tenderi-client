import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PrekoProcijenjene} from "../model/PrekoProcijenjene.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TenderService} from "../tender.service";

@Component({
  selector: 'app-perko-procijenjene',
  templateUrl: './perko-procijenjene.component.html',
  styleUrls: ['./perko-procijenjene.component.css']
})
export class PerkoProcijenjeneComponent implements OnInit, OnChanges {

  public displayedColumns = ['id', 'partija', 'atc', 'nazivProizvoda', 'procijenjenaJedinicnaCijena', 'ponudjenaJedinicnaCijena',
    'procijenjenaUkupnaCijena', 'ponudjenaUkupnaCijena', 'ponudjac', 'brojTendera'];

  public dataSource = new MatTableDataSource<PrekoProcijenjene>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tenderService: TenderService) { }
  ukupnoProcijenjena:number;
  ukupnaPonudjena:number;

  @Input() tender: string;
  @Input() ponnudjac:string;
  // tslint:disable-next-line:typedef
  ngOnInit() {
    // this.getAllPrekoProcijenjene();
  }

  // tslint:disable-next-line:typedef
  public getAllPrekoProcijenjene()  {
    this.tenderService.getPrekoProcijenjeneFindByTenderi(this.tender)
      .subscribe(res => {
        this.dataSource.data = res as PrekoProcijenjene[];
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
    this.getAllPrekoProcijenjene()
    // @ts-ignore
    this.doFilter();
  }
}
