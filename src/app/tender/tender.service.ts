import { Injectable } from '@angular/core';


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Ponude } from './model/ponude.model';


@Injectable({
  providedIn: 'root'
})
export class TenderService {

  
  readonly API_URL_PREKO_PROCIJENJE = 'http://localhost:8080/api/ponude/preko_procijenjene/';
  private readonly API_URL_DELETE_SELECTED = 'http://localhost:8080/api/ponude/delete/selected';
  private readonly API_URL = 'http://localhost:8080/api/ponude';
  private readonly API_URL_DELETE = 'http://localhost:8080/api/ponude/delete/';
  private readonly API_URL_UPDATE_SELECTED = 'http://localhost:8080/api/ponude/update/selected/';
  private readonly API_URL_BODOVANJE = 'http://localhost:8080/api/ponude/bodovanje/';
  private readonly API_URL_PRVORANGIRANI = 'http://localhost:8080/api/ponude/prvorangirani/';
  readonly API_URL_ADD = 'http://localhost:8080/api/ponude/add';
  readonly API_URL_UPDATE = 'http://localhost:8080/api/ponude/update';
  readonly API_URL_FIND_BY_TENDER = 'http://localhost:8080/api/ponude/tender/';
  readonly PREKO_PROCIJENJENE_URL_FIND_BY_TENDER = 'http://localhost:8080/api/ponude/tender/preko_procijenjene/';
  readonly API_URL_HVALE_PARTIJE_BY_TENDER = 'http://localhost:8080/api/ponude/hvali/';
  readonly BODOVANJE_URL_FIND_BY_TENDER = 'http://localhost:8080/api/ponude/bodovanje/';
  readonly PRVORANIRANI_URL_FIND_BY_TENDER = 'http://localhost:8080/api/ponude/tender/prvorangirani/';
   readonly UpdateUgovor='http://localhost:8080/api/ponude/update/ugovor/'

  
  // readonly API_URL_PREKO_PROCIJENJE = 'https://tenderi-montefarm.herokuapp.com/api/ponude/preko_procijenjene/';
  // private readonly API_URL_DELETE_SELECTED = 'https://tenderi-montefarm.herokuapp.com/api/ponude/delete/selected';
  // private readonly API_URL = 'https://tenderi-montefarm.herokuapp.com/api/ponude';
  // private readonly API_URL_DELETE = 'https://tenderi-montefarm.herokuapp.com/api/ponude/delete/';
  // private readonly API_URL_UPDATE_SELECTED = 'https://tenderi-montefarm.herokuapp.com/api/ponude/update/selected/';
  // private readonly API_URL_BODOVANJE = 'https://tenderi-montefarm.herokuapp.com/api/ponude/bodovanje/';
  // private readonly API_URL_PRVORANGIRANI = 'https://tenderi-montefarm.herokuapp.com/api/ponude/prvorangirani/';
  // readonly API_URL_ADD = 'https://tenderi-montefarm.herokuapp.com/api/ponude/add';
  // readonly API_URL_UPDATE = 'https://tenderi-montefarm.herokuapp.com/api/ponude/update';
  // readonly API_URL_FIND_BY_TENDER = 'https://tenderi-montefarm.herokuapp.com/api/ponude/tender/';
  // readonly PREKO_PROCIJENJENE_URL_FIND_BY_TENDER = 'https://tenderi-montefarm.herokuapp.com/api/ponude/tender/preko_procijenjene/';
  // readonly API_URL_HVALE_PARTIJE_BY_TENDER = 'https://tenderi-montefarm.herokuapp.com/api/ponude/hvali/';
  // readonly BODOVANJE_URL_FIND_BY_TENDER = 'https://tenderi-montefarm.herokuapp.com/api/ponude/bodovanje/';
  // readonly PRVORANIRANI_URL_FIND_BY_TENDER = 'https://tenderi-montefarm.herokuapp.com/api/ponude/tender/prvorangirani/';



  dataChange: BehaviorSubject<Ponude[]> = new BehaviorSubject<Ponude[]>([]);
  dialogData: any;

  constructor(private http: HttpClient) {
  }

  // get data(): Ponude[] {
  //   return this.dataChange.value;
  // }

  // // tslint:disable-next-line:typedef
  // public getData() {
  //   return this.http.get(this.API_URL);
  // }

  // public getPrekoProcijenjene() {
  //   return this.http.get(this.API_URL_PREKO_PROCIJENJE);
  // }



  // public getHvalePartije() {
  //   return this.http.get(this.API_URL_HVALE_PARTIJE_BY_TENDER);
  // }


  // // tslint:disable-next-line:typedef
  // public getBodovanje() {
  //   return this.http.get(this.API_URL_BODOVANJE);
  // }

  // // tslint:disable-next-line:typedef
  // public getPrvorangirani() {
  //   return this.http.get(this.API_URL_PRVORANGIRANI);
  // }







  // //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa


  public getFindByTenderi(broj: number) {
    return this.http.get(this.API_URL_FIND_BY_TENDER + broj);
  }

   


  public getBodovanjeFindByTenderi(broj:number) {
    return this.http.get(this.BODOVANJE_URL_FIND_BY_TENDER + broj);
  }

  public getPrvorangiraniFindByTenderi(broj: number) {
    return this.http.get(this.PRVORANIRANI_URL_FIND_BY_TENDER + broj);
  }



  public getHvalePartijeFindByTenderi(broj: number) {
    return this.http.get(this.API_URL_HVALE_PARTIJE_BY_TENDER + broj);
  }



  public getPrekoProcijenjeneFindByTenderi(broj: number) {
    return this.http.get(this.PREKO_PROCIJENJENE_URL_FIND_BY_TENDER + broj);
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
    this.http.post(this.API_URL_ADD, ponude).subscribe(data => {
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
    this.http.put(this.API_URL_UPDATE, ponude).subscribe(data => {
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
    this.http.put(this.API_URL_UPDATE_SELECTED + id, null).subscribe(data => {
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

  updateUgovorSelected(ugovor_broj: String, tender_broj:number, ponudjaci:String): void {
    this.http.put(this.UpdateUgovor + ugovor_broj+ tender_broj+ponudjaci)
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
