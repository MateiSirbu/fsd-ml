import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HeaderStateService } from '../../services/header-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.minLength(2), Validators.required]),
    password: new FormControl("", [Validators.minLength(8), Validators.required])
  });

  constructor(private snackBar: MatSnackBar,
    private userService: UserService,
    public headerService: HeaderStateService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.userService.isLoggedIn())
      this.router.navigate(['/'])
  }

  onSignUpClick(): void {
    this.loginForm.get('username').disable();
    this.loginForm.get('password').disable();
    this.userService.signUp(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .pipe(tap((resp) => {
        this.openSnackBar(`Signup successful.`);
        this.router.navigate(['/'])
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBar(`${error.status}: ${error.statusText}.`);
        this.loginForm.get('username').enable();
        this.loginForm.get('password').enable();
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
