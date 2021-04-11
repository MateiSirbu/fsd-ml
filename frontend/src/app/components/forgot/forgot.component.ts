import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TokenManagerService } from 'src/app/services/token-manager.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(
    private token: TokenManagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.isLoggedIn())
      this.router.navigate(['/home'])
  }

  isLoggedIn() {
    const expiration = this.token.getToken().expires_at
    const expiresAt = JSON.parse(expiration);
    return moment().isBefore(moment(expiresAt))
  }
}
