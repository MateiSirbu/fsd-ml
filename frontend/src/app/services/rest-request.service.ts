import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestRequestService {

  baseUrl = "http://localhost:4200/api/";

  constructor(private http: HttpClient) { }

  get(url): Observable<any> {
    return this.http.get(this.baseUrl + url);
  }

  post(body, path): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/'
      })
    };
    return this.http.post(this.baseUrl + path, body, headers)
  }
}
