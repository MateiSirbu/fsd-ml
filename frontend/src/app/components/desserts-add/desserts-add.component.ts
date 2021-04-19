import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-desserts-add',
  templateUrl: './desserts-add.component.html',
  styleUrls: ['./desserts-add.component.scss']
})
export class DessertsAddComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DessertsAddComponent>,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) { }

  public form: FormGroup
  public buttonsClickable: boolean = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      calcium: this.fb.control('', Validators.required),
      calories: this.fb.control('', Validators.required),
      carbs: this.fb.control('', Validators.required),
      dessert: this.fb.control('', Validators.required),
      fat: this.fb.control('', Validators.required),
      iron: this.fb.control('', Validators.required),
      protein: this.fb.control('', Validators.required),
      sodium: this.fb.control('', Validators.required),
    })
    this.buttonsClickable = true;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.form.disable()
    this.buttonsClickable = false;
    let reqBody: any = {
      calcium: this.form.controls['calcium'].value + '%',
      calories: this.form.controls['calories'].value,
      carbs: this.form.controls['carbs'].value,
      dessert: this.form.controls['dessert'].value,
      fat: this.form.controls['fat'].value,
      iron: this.form.controls['iron'].value + '%',
      protein: this.form.controls['protein'].value,
      sodium: this.form.controls['sodium'].value
    }
    this.http.post<any>("http://localhost:8080/", reqBody)
      .pipe(tap(() => this.openSnackBar("Dessert added successfully.")))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBar(`${error.status}: ${error.statusText}.`);
        this.form.enable()
        this.buttonsClickable = true;
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
}
