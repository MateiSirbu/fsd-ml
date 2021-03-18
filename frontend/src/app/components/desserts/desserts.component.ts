import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DessertService } from '../../services/desserts.service';
import { EMPTY, Observable } from 'rxjs';
import { Dessert } from 'src/app/entities/dessert.entity';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar) {

    // if (!this.userService.isLoggedIn())
    //   this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.dessertsColumns = this.dessertService.getHeader()
    this.dessertService.getDesserts()
      .pipe(tap((result: Dessert[]) => this.dessertsList = result))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBar(`${error.status}: ${error.statusText}.`);
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
