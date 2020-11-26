import { Injectable } from '@angular/core';


import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Ponude} from './model/ponude.model';


@Injectable({
  providedIn: 'root'
})
export class TenderService {


  private readonly API_URL = 'https://evening-everglades-02205.herokuapp.com/api/ponude';
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
    return this.http.get('https://evening-everglades-02205.herokuapp.com/api/ponude');
  }
  // tslint:disable-next-line:typedef
  public getBodovanje()  {
    return this.http.get('https://evening-everglades-02205.herokuapp.com/api/ponude/bodovanje');
  }

  // tslint:disable-next-line:typedef
  public getPrvorangirani()  {
    return this.http.get('https://evening-everglades-02205.herokuapp.com/api/ponude/prvorangirani');
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
