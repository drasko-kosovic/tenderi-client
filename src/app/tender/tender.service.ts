import { Injectable } from '@angular/core';


import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Ponude} from './model/ponude.model';


@Injectable({
  providedIn: 'root'
})
export class TenderService {


  private readonly API_URL = 'http://localhost:8080/api/ponude/api/ponude/sve';
  private readonly API_URL_DELETE = 'http://localhost:8080/api/ponude/delete/';
  // private readonly API_URL_UPDATE = 'http://localhost:8080/api/person/update';

  dataChange: BehaviorSubject<Ponude[]> = new BehaviorSubject<Ponude[]>([]);
  dialogData: any;

  constructor(private http: HttpClient) {
  }

  get data(): Ponude[] {
    return this.dataChange.value;
  }

  // tslint:disable-next-line:typedef
  public getData()  {
    return this.http.get('http://localhost:8080/api/ponude/sve');
  }
  // tslint:disable-next-line:typedef
  public getBodovanje()  {
    return this.http.get('http://localhost:8080/api/ponude/bodovanje');
  }

  // tslint:disable-next-line:typedef
  public getPrvorangirani() {
    return this.http.get('http://localhost:8080/api/ponude/prvorangirani');
  }

  deletePonuda(id: number): void {
    this.http.delete(this.API_URL_DELETE + id).subscribe(data => {
        console.log('obrisano');
        // this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
  // tslint:disable-next-line:typedef
  getDialogData() {
    return this.dialogData;
  }
  addPonude(ponude: Ponude): void {
    this.http.post(this.API_URL, ponude).subscribe(data => {
        this.dialogData = ponude;
        // this.notificationService.success( this.translate.get(['login.login']));
        // this.toasterService.success('Successfully added');
        console.log('dodato');
      },
      (err: HttpErrorResponse) => {

        console.log('nije dodato');
      });
  }

}
