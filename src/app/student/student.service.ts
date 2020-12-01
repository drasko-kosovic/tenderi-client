import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Ponude} from "../tender/model/ponude.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Student} from "../tender/model/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly API_URL = 'http://localhost:8080/api/student/all'
  private readonly API_URL_UPDATE = 'http://localhost:8080/api/student/update';
  dialogData: any;

  constructor(private http: HttpClient) {
  }

  public getStudentAll()  {
    return this.http.get(this.API_URL);
  }

  addPonude(student: Student): void {
    this.http.post('http://localhost:8080/api/student/add', student).subscribe(data => {
        this.dialogData = student;
        // this.notificationService.success( this.translate.get(['login.login']));
        // this.toasterService.success('Successfully added');
        console.log('dodato');
      },
      (err: HttpErrorResponse) => {

        console.log('nije dodato');
      });
  }

  updateStudent(student: Student): void {
    this.http.put(this.API_URL_UPDATE , student).subscribe(data => {
        this.dialogData = student;
        // this.toasterService.showToaster('Successfully edited', 3000);
        console.log('updated');
      },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
        console.log(' no updated');
      }
    );
  }

}
