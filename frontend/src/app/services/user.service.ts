import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment'
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private createSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logIn(email: string, password: string) {
    return this.http.post('/api/login', new User({ email: email, password: password }))
      .pipe(tap(res => this.createSession(res)), shareReplay());
  }

  signUp(email: string, password: string) {
    return this.http.post('/api/signup', new User({ email: email, password: password }));
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
