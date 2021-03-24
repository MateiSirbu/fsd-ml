import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {
  constructor() { }

  logOut() {
    this.deleteToken();
  }

  isLoggedIn() {
    const expiration = this.getToken().expires_at
    const expiresAt = JSON.parse(expiration);
    return moment().isBefore(moment(expiresAt))
  }

  getToken() {
    return {
      'id_token': localStorage.getItem("id_token"),
      'expires_at': localStorage.getItem("expires_at")
    }
  }

  setToken(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  deleteToken() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }
}
