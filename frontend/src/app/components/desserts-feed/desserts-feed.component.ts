import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Dessert } from 'src/app/entities/dessert.entity';

@Component({
  selector: 'app-desserts-feed',
  templateUrl: './desserts-feed.component.html',
  styleUrls: ['./desserts-feed.component.scss']
})
export class DessertsFeedComponent implements OnInit {
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
    return ['dessert', 'calories', 'fat',
      'carbs', 'protein', 'sodium', 'calcium', 'iron'
    ];
  }

  fetchDesserts(): Observable<Dessert[]> {
    return this.http.get<Dessert[]>("https://us-central1-fsd-ml.cloudfunctions.net/fetchDesserts");
  }

  onViewAsClick() {
    this.router.navigate(['/desserts'])
  }
}
