import { Component, OnInit } from '@angular/core';
import { DessertItem } from './deserts-items.interface';
import { DessertListMockService} from './desserts-items.mock.service';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent implements OnInit {

  dessertsItems: DessertItem[];
  desertsColumns: string[] = [
    'select',
    'Dessert',
    'Calories',
    'Fat',
    'Carbs',
    'Protein',
    'Sodium',
    'Calcium',
    'Iron'
  ];

  constructor(private service: DessertListMockService ) {

   }

  ngOnInit(): void {

    this.dessertsItems = this.service.getData();
  }

}


/*
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InventoryListService } from '../../app-logic/inventory-list.service';
import { InventoryItem } from '../../app-logic/inventory-item';
import { SelectionModel } from '@angular/cdk/collections';
import { switchMap } from 'rxjs/operators';
import { merge, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  inventoryItems: InventoryItem[];
  inventoryColumns: string[] = [
    'select',
    'id',
    'name',
    'description',
    'user',
    'location',
    'inventoryNumber',
    'createdAt',
    'modifiedAt',
    'active',
    'actions',
  ];
  selection = new SelectionModel<InventoryItem>(true, []);
  isLoading = true;
  activeOnly$ = new BehaviorSubject(false);
  itemsCount = 0;

  constructor(private inventoryListService: InventoryListService) {}

  get activeOnly(): boolean {
    return this.activeOnly$.value;
  }
  set activeOnly(v: boolean) {
    this.activeOnly$.next(v);
  }

  ngOnInit(): void {

    merge(this.sort.sortChange, this.activeOnly$).subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    merge(this.paginator.page, this.sort.sortChange, this.activeOnly$)
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          return this.inventoryListService
            .getData(
              this.paginator.pageIndex + 1,
              this.paginator.pageSize,
              this.activeOnly,
              this.sort.active
                ? `${this.sort.active}_${this.sort.direction ? this.sort.direction : 'asc'}`
                : ''
            );
        })
      )
      .subscribe(
        (data) => {
          this.inventoryItems = data[0];
          this.itemsCount = data[1];
          this.isLoading = false;
        },
        (error) => {
          console.log('Table could not be filled with data', error);
          this.isLoading = false;
        }
      );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.inventoryItems.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.inventoryItems.forEach((row) => this.selection.select(row));
  }
}

*/
