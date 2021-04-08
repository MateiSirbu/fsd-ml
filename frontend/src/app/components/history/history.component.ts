import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Classification } from 'src/app/entities/classification.entity';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestRequestService } from 'src/app/services/rest-request.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  classificationList: Classification[]
  classificationColumns: string[]

  constructor(
    private rest: RestRequestService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.classificationColumns = this.fetchHeader()
    this.fetchHistoryEntries()
      .pipe(tap((result: Classification[]) => this.classificationList = result))
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

  fetchHeader() {
    return ['select', 'id', 'name', 'timestamp'];
  }

  fetchHistoryEntries(): Observable<Classification[]> {
    return this.rest.get('history');
  }

  addHistoryEntry(entry: Classification) {
    return this.rest.post('history', entry);
  };
}
