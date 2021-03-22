import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HeaderStateService {

  constructor() { }

  isLoggedIn() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment().isBefore(moment(expiresAt))
  }

  willShowHeader() {
    return this.isLoggedIn();
  }
}
