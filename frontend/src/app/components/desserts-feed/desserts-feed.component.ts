import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Dessert } from 'src/app/entities/dessert.entity';
import { MatDialog } from '@angular/material/dialog';
import { DessertsAddComponent } from '../desserts-add/desserts-add.component';
import { DessertDeleteComponent } from '../dessert-delete/dessert-delete.component';
import { DessertEditComponent } from '../dessert-edit/dessert-edit.component';
import { FormBuilder, Validators } from '@angular/forms';

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
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder) {
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

  addDessert() {
    const dialogRef = this.dialog.open(DessertsAddComponent, { width: '400px', maxHeight: '90vh' })
    dialogRef.afterClosed().subscribe()
  }

  updateDessert(dessert) {
    let form = this.fb.group({
      calcium: this.fb.control(new String(dessert.calcium).slice(0, -1), Validators.required),
      calories: this.fb.control(new Number(dessert.calories), Validators.required),
      carbs: this.fb.control(new Number(dessert.carbs), Validators.required),
      dessert: this.fb.control(new String(dessert.dessert), Validators.required),
      fat: this.fb.control(new Number(dessert.fat), Validators.required),
      iron: this.fb.control(new String(dessert.iron).slice(0, -1), Validators.required),
      protein: this.fb.control(new Number(dessert.protein), Validators.required),
      sodium: this.fb.control(new Number(dessert.sodium), Validators.required),
    })
    const dialogRef = this.dialog.open(DessertEditComponent, { width: '330px', data: form })
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let reqBody = {
          id: Number(dessert.id),
          calcium: form.controls['calcium'].value + '%',
          calories: form.controls['calories'].value,
          carbs: form.controls['carbs'].value,
          dessert: form.controls['dessert'].value,
          fat: form.controls['fat'].value,
          iron: form.controls['iron'].value + '%',
          protein: form.controls['protein'].value,
          sodium: form.controls['sodium'].value
        }
        return this.http.request(
          "PUT", "https://us-central1-fsd-ml.cloudfunctions.net/updateDessert",
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: reqBody
          })
          .pipe(tap(() => {
            window.location.reload();
          }))
          .pipe(catchError((error: HttpErrorResponse) => {
            this.openSnackBar(`${error.status}: ${error.statusText}.`);
            return EMPTY;
          }))
          .subscribe()
      }
    })
  }

  deleteDessert(dessert) {
    const dialogRef = this.dialog.open(DessertDeleteComponent, { width: '330px', data: dessert })
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        return this.http.request(
          "DELETE", "https://us-central1-fsd-ml.cloudfunctions.net/deleteDessert",
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: { id: Number(dessert.id) }
          })
          .pipe(tap(() => {
            window.location.reload();
          }))
          .pipe(catchError((error: HttpErrorResponse) => {
            this.openSnackBar(`${error.status}: ${error.statusText}.`);
            return EMPTY;
          }))
          .subscribe()
      }
    })
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

  openSnackBar(message) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['custom-snack-bar']
    });
  }

  onViewAsClick() {
    this.router.navigate(['/desserts'])
  }
}
