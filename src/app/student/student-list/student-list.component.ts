import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Ponude} from "../../tender/model/ponude.model";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {StudentService} from "../student.service";
import {Student} from "../../tender/model/student.model";
import {Transaction} from "../../home/home.component";
import {AddDialogComponent} from "../student-dialog/add/add.dialog.component";



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit,AfterViewInit {

  public displayedColumns = ['id', 'name', 'price','actions'];
  public dataSource = new MatTableDataSource<Student>();
  index: number;
  id: number;
  ukupno: number;
  transactions: Student[]
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private studentService: StudentService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllStudent();
  }


  public getAllStudent() {
    this.studentService.getStudentAll()
      .subscribe(res => {
        // @ts-ignore
        this.dataSource.data = res as Student[];
        console.log(res);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  }

  getTotalCost() {
    return this.transactions.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

  // doFilter(fitlervalue: string) {
  //   this.dataSource.filter = fitlervalue.trim().toLocaleLowerCase();
  //   this.ukupno = this.dataSource.filteredData.map(t => t.price).reduce((acc, value) => acc + value, 0);
  // }

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {Student: {}}
    });
  }

  // startEdit(i: number, id: number) {
  //   this.id = id;
  //   // index row is used just for debugging proposes and can be removed
  //   this.index = i;
  //   console.log(this.index);
  //   const dialogRef = this.dialog.open(EditDialogComponent, {
  //     data: {id, age, country, firstName, lastName}
  //   });

  // startEdit(i: number, id: number, name: string, price: number) {
  //   this.id = id;
  //   // index row is used just for debugging proposes and can be removed
  //   // this.index = i;
  //   const dialogRef = this.dialog.open(EditDialogComponent, {
  //     data: {id, name, price}
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //
  //       console.log("Updated");
  //     }
  //   });
  // }

}
