import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenManagerService } from 'src/app/services/token-manager.service';
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
    private router: Router,
    public token: TokenManagerService) { }

  logOut() {
    this.token.deleteToken()
    this.router.navigate(['/login'])
    window.location.reload()
  }
}
