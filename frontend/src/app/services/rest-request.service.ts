import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestRequestService {

  baseUrl = "http://localhost:4200/api/";

  constructor(private http: HttpClient) { }

  get(route): Observable<any> {
    return this.http.get(this.baseUrl + route);
  }

  post(route, body): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseUrl + route, body, headers)
  }
}