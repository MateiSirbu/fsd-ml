import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderStateService {

  constructor(private userService: UserService) {}
  
  willShowHeader() {
    return this.userService.isLoggedIn()
  }
}
