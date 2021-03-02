import { Component, OnInit } from '@angular/core';
import { DessertItem } from './deserts-items.interface';
import { DessertListMockService } from './desserts-items.mock.service';

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

  constructor(private service: DessertListMockService) {
  }

  ngOnInit(): void {
    this.dessertsItems = this.service.getData();
  }

}
