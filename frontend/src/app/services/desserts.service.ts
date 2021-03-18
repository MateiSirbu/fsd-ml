import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dessert } from '../entities/dessert.entity';

@Injectable({
  providedIn: 'root'
})
export class DessertService {

  constructor(private http: HttpClient) {
    console.log(this.getDesserts())
  }

  getHeader() {
    return ['select', 'dessert', 'calories', 'fat',
      'carbs', 'protein', 'sodium', 'calcium', 'iron'
    ];
  }

  getDesserts(): Observable<Dessert[]> {
    return this.http.get<Dessert[]>("/api/desserts")
  }

  addDesserts(dessert: Dessert) {
    return this.http.post('/api/signup', dessert);
  };
}
