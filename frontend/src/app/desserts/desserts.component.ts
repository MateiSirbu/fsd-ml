import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Dessert } from 'src/app/entities/dessert.entity';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent implements OnInit {
  dessertsList: Dessert[]
  dessertsColumns: string[]

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.dessertsColumns = this.fetchHeader()
    this.fetchDesserts()
      .pipe(tap((result: Dessert[]) => this.dessertsList = result))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBar(`${error.status}: ${error.statusText}.`);
        return EMPTY;
      }))
      .subscribe()
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['custom-snack-bar']
    });
  }

  fetchHeader() {
    return ['select', 'dessert', 'calories', 'fat',
      'carbs', 'protein', 'sodium', 'calcium', 'iron'
    ];
  }

  fetchDesserts(): Observable<Dessert[]> {
    return this.http.get<Dessert[]>("/api/desserts");
  }

  addDesserts(dessert: Dessert) {
    return this.http.post('/api/signup', dessert);
  };
}

