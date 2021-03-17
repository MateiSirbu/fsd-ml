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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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

  onLoginClick(): void {
    this.loginForm.get('username').disable();
    this.loginForm.get('password').disable();
    this.userService.logIn(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
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
}
