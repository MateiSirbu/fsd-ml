import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestRequestService {

  baseUrl = "http://localhost:4200/";
  constructor(private http: HttpClient) { }

  getItems(url): Observable<any> {
    console.log('Request is sent!');
    return this.http.get(this.baseUrl+url);
  }

  postItems(body,url): Observable<any> {
    console.log('Request is sent!');
    const headers =  {
      headers: new  HttpHeaders({ 
        'Content-Type': 'application/'})
    };
    return this.http.post(this.baseUrl+url,body, headers)
  }
}
