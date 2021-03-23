import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderStateService } from '../../services/header-state.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'FSD-ML';

  constructor(
    public headerService: HeaderStateService,
    private router: Router) { }

  clearStorage() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  logOut() {
    this.clearStorage()
    this.router.navigate(['/login'])
  }
}
