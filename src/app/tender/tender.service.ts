import { Injectable } from '@angular/core';


import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Ponude} from './model/ponude.model';
import {Student} from "./model/student.model";


@Injectable({
  providedIn: 'root'
})
export class TenderService {

  private readonly API_URL_DELETE_SELECTED = 'https://tenderi-montefarm.herokuapp.com/api/ponude/delete/selected';
  private readonly API_URL = 'http://localhost:8080/api/ponude/api/ponude/sve';
  private readonly API_URL_DELETE = 'https://tenderi-montefarm.herokuapp.com/api/ponude/delete/';
  private readonly API_URL_UPDATE_SELECTED = 'https://tenderi-montefarm.herokuapp.com/api/ponude/update/selected/';

  dataChange: BehaviorSubject<Ponude[]> = new BehaviorSubject<Ponude[]>([]);
  dialogData: any;

  constructor(private http: HttpClient) {
  }

  get data(): Ponude[] {
    return this.dataChange.value;
  }

  // tslint:disable-next-line:typedef
  public getData() {
    return this.http.get('https://tenderi-montefarm.herokuapp.com/api/ponude/sve');
  }

  // tslint:disable-next-line:typedef
  public getBodovanje() {
    return this.http.get('https://tenderi-montefarm.herokuapp.com/api/ponude/bodovanje');
  }

  // tslint:disable-next-line:typedef
  public getPrvorangirani() {
    return this.http.get('https://tenderi-montefarm.herokuapp.com/api/ponude/prvorangirani');
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
    this.http.post('https://tenderi-montefarm.herokuapp.com/api/ponude/add', ponude).subscribe(data => {
        this.dialogData = ponude;
        // this.notificationService.success( this.translate.get(['login.login']));
        // this.toasterService.success('Successfully added');
        console.log('dodato');
      },
      (err: HttpErrorResponse) => {

        console.log('nije dodato');
      });
  }

   updatePonude(ponude: Ponude): void {
    this.http.put('https://tenderi-montefarm.herokuapp.com/api/ponude/update', ponude).subscribe(data => {
        this.dialogData = ponude;
        // this.toasterService.showToaster('Successfully edited', 3000);
        console.log('updated');
      },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
        console.log(' no updated');
      }
    );


  }

  updatePersonSelected(id: number): void {
    this.http.put( this.API_URL_UPDATE_SELECTED + id, null).subscribe(data => {
        // this.dialogData = person;
        // this.toasterService.showToaster('Successfully edited', 3000);
        console.log('updated');
      },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
        console.log(' no updated');
      }
    );
  }

  deleteSelected(): void {
    this.http.delete(this.API_URL_DELETE_SELECTED).subscribe(data => {
        console.log('obrisano');
        // this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }


}
