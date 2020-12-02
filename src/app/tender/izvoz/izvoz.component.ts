import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Ponude} from '../model/ponude.model';
import {TenderService} from '../tender.service';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-izvoz',

  templateUrl: './izvoz.component.html',
  styleUrls: ['./izvoz.component.css']
})
export class IzvozComponent implements OnInit , AfterViewInit {

  public displayedColumns = ['id', 'partija', 'ponudjac', 'ponudjenaUkupnaCijena'];
  public dataSource = new MatTableDataSource<Ponude>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ukupno: number;
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

  // tslint:disable-next-line:typedef
  doFilter(fitlervalue: string) {
    this.dataSource.filter = fitlervalue.trim().toLocaleLowerCase();
    this.ukupno = this.dataSource.filteredData.map(t => t.ponudjenaUkupnaCijena).reduce((acc, value) => acc + value, 0);
  }

  // tslint:disable-next-line:typedef
  calculation() {
    let sum = 0;
    if (this.dataSource) {
      for (const row of this.dataSource.data) {
        // tslint:disable-next-line:triple-equals
        if (row.id != 0) { sum += row.ponudjenaUkupnaCijena; }
      }
    }
    return sum;
  }

}
