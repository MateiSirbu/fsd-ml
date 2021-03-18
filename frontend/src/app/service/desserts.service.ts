import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DessertItem } from '../components/desserts/deserts-items.interface';

@Injectable({
  providedIn: 'root'
})
export class DessertService {

  baseUrl = "http://localhost:4200/api";
  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    console.log('Get desserts Request is sent!');
    return this.http.get(this.baseUrl + "desserts");
  }

  postItems(body, url): Observable<DessertItem> {
    console.log('Post desserts Request is sent!');
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/'
      })
    };

    return this.http.post<DessertItem>(this.baseUrl + url, body, headers)
  }
}
