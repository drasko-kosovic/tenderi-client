import { Injectable } from '@angular/core';


import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Ponude} from './model/ponude.model';


@Injectable({
  providedIn: 'root'
})
export class TenderService {


  private readonly API_URL = 'http://localhost:8080/api/ponude';
  // private readonly API_URL_DELETE = 'http://localhost:8080/api/delete/';
  // private readonly API_URL_UPDATE = 'http://localhost:8080/api/person/update';

  dataChange: BehaviorSubject<Ponude[]> = new BehaviorSubject<Ponude[]>([]);


  constructor(private http: HttpClient) {
  }

  get data(): Ponude[] {
    return this.dataChange.value;
  }

  // tslint:disable-next-line:typedef
  public getData()  {
    return this.http.get('http://localhost:8080/api/owners');
  }

  /** CRUD METHODS */
  getAllPonude(): void {
    this.http.get<Ponude[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

}
