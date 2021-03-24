import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenManagerService } from './token-manager.service';

@Injectable({
  providedIn: 'root'
})
export class RestRequestService {

  baseUrl = "http://localhost:4200/api/";

  constructor(
    private http: HttpClient,
    private token: TokenManagerService,
    private router: Router) { }

  private authorize(observable: Observable<any>) {
    return observable.pipe(catchError((error: HttpErrorResponse) => {
      if (error.status == 401) {
        this.token.deleteToken()
        this.router.navigate(['/login'])
        return EMPTY;
      }
      else {
        return throwError(error);
      }
    }))
  }

  get(route): Observable<any> {
    return this.authorize(this.http.get(this.baseUrl + route));
  }

  post(route, body): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.authorize(this.http.post(this.baseUrl + route, body, headers))

  }
}