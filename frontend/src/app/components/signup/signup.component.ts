import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderStateService } from '../../services/header-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from 'src/app/entities/user.entity';
import { RestRequestService } from 'src/app/services/rest-request.service';
import { TokenManagerService } from 'src/app/services/token-manager.service';

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

  constructor(
    private rest: RestRequestService,
    private token: TokenManagerService,
    private snackBar: MatSnackBar,
    public headerService: HeaderStateService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.isLoggedIn())
      this.router.navigate(['/home'])
  }

  onSignUpClick(): void {
    this.loginForm.get('username').disable();
    this.loginForm.get('password').disable();
    this.signUp(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .pipe(tap((resp) => {
        this.openSnackBar(`Signup successful.`);
        this.router.navigate(['/home'])
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

  isLoggedIn() {
    const expiration = this.token.getToken().expires_at
    const expiresAt = JSON.parse(expiration);
    return moment().isBefore(moment(expiresAt))
  }

  signUp(email: string, password: string) {
    return this.rest.post('signup', new User({ email: email, password: password }))
  }

}
