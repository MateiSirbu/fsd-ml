import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HeaderStateService } from '../../services/header-state.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'FSD';

  constructor(public headerService: HeaderStateService, 
    private userService: UserService,
    private router: Router) {
    }

  logOut() {
    this.userService.logOut()
    this.router.navigate(['/login'])
  }
}
