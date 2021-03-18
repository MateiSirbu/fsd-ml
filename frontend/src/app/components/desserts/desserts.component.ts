import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DessertService } from '../../services/desserts.service';
import { Observable } from 'rxjs';
import { Dessert } from 'src/app/entities/dessert.entity';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent implements OnInit {
  dessertsList: Dessert[]
  dessertsColumns: string[]

  constructor(
    private dessertService: DessertService,
    private userService: UserService,
    private router: Router) {

    if (!this.userService.isLoggedIn())
      this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.dessertsColumns = this.dessertService.getHeader()
    this.dessertService.getDesserts()
      .pipe(
        tap((result: Dessert[]) => this.dessertsList = result)
      )
      .subscribe()
  }

}
