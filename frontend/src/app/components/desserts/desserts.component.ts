import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Dessert } from 'src/app/entities/dessert.entity';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit(): void {
    this.dessertsColumns = this.fetchHeader()
    this.fetchDesserts()
      .pipe(tap((result: Dessert[]) => this.dessertsList = this.sortDesserts(result)))
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
    return ['dessert', 'calories', 'fat',
      'carbs', 'protein', 'sodium', 'calcium', 'iron'
    ];
  }

  fetchDesserts(): Observable<Dessert[]> {
    return this.http.get<Dessert[]>("https://us-central1-fsd-ml.cloudfunctions.net/fetchDesserts");
  }

  sortDesserts(desserts: Dessert[]) {
    return desserts.sort(function (a, b) {
      return (a.dessert).localeCompare(b.dessert);
    });
  }

  onViewAsClick() {
    this.router.navigate(['/desserts/feed'])
  }
}

