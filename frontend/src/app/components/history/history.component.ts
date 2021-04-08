import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Classification } from 'src/app/entities/classification.entity';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestRequestService } from 'src/app/services/rest-request.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  classificationList: MatTableDataSource<Classification>;
  classificationColumns: string[]
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private rest: RestRequestService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.classificationColumns = this.fetchHeader()
    this.fetchHistoryEntries()
      .pipe(tap((result: Classification[]) => {
        this.classificationList = new MatTableDataSource(result);
        this.classificationList.sort = this.sort;
      }))
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
    return ['file', 'timestamp', 'result'];
  }

  fetchHistoryEntries(): Observable<Classification[]> {
    return this.rest.get('history');
  }

  addHistoryEntry(entry: Classification) {
    return this.rest.post('history', entry);
  };
}
