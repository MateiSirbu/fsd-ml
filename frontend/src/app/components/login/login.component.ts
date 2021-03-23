import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderStateService } from '../../services/header-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from 'src/app/entities/user.entity';
import { RestRequestService } from 'src/app/services/rest-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.minLength(2), Validators.required]),
    password: new FormControl("", [Validators.minLength(8), Validators.required])
  });


  constructor(
    private rest: RestRequestService,
    private snackBar: MatSnackBar,
    public headerService: HeaderStateService,
    private router: Router) {
  }

  ngOnInit(): void { }

  onLoginClick(): void {
    this.loginForm.get('username').disable();
    this.loginForm.get('password').disable();
    this.logIn(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .pipe(tap((resp) => {
        if (resp != null) {
          this.openSnackBar(`Login successful.`);
          this.router.navigate(['/'])
        }
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.openSnackBar(`No account is associated with this e-mail address.`);
        }
        else if (error.status == 401) {
          this.openSnackBar(`Incorrect credentials, please try again.`);
        }
        else {
          this.openSnackBar(`${error.status}: ${error.statusText}.`);
        }
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

  private createSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logIn(email: string, password: string) {
    return this.rest.post('login', new User({ email: email, password: password }))
      .pipe(tap(res => this.createSession(res)), shareReplay());
  }

  signUp(email: string, password: string) {
    return this.rest.post('signup', new User({ email: email, password: password }))
  }

  logOut() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  isLoggedIn() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment().isBefore(moment(expiresAt))
  }

}
