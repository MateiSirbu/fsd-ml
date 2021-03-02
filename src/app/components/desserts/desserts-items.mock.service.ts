import { Injectable } from '@angular/core';
import { DessertItem } from './deserts-items.interface';

@Injectable({
  providedIn: 'root'
})

export class DessertListMockService {
  desertItemsData: Array<DessertItem> = [
    {
      Dessert: 'Frozen yogurt',
      Calories: 159,
      Fat: 6.0,
      Carbs: 24,
      Protein: 4.0,
      Sodium: 87,
      Calcium: '14%',
      Iron: '1%'
    },

    {
      Dessert: 'Ice cream sandwich',
      Calories: 234,
      Fat: 9.0,
      Carbs: 37,
      Protein: 4.3,
      Sodium: 129,
      Calcium: '8%',
      Iron: '1%'
    },

    {
      Dessert: 'Eclair',
      Calories: 262,
      Fat: 16.0,
      Carbs: 24,
      Protein: 6.0,
      Sodium: 337,
      Calcium: '6%',
      Iron: '7%'
    },

    {

      Dessert: 'Cupcake',
      Calories: 305,
      Fat: 3.7,
      Carbs: 67,
      Protein: 4.3,
      Sodium: 413,
      Calcium: '3%',
      Iron: '8%'
    },
    {

      Dessert: 'Gingerbread',
      Calories: 356,
      Fat: 16.0,
      Carbs: 49,
      Protein: 3.9,
      Sodium: 327,
      Calcium: '7%',
      Iron: '16%'
    },
    {

      Dessert: 'Jelly bean',
      Calories: 375,
      Fat: 0.0,
      Carbs: 94,
      Protein: 0.0,
      Sodium: 50,
      Calcium: '0%',
      Iron: '0%'
    },
    {

      Dessert: 'Lollipop',
      Calories: 392,
      Fat: 0.2,
      Carbs: 98,
      Protein: 0,
      Sodium: 38,
      Calcium: '0%',
      Iron: '2%'
    },
    {

      Dessert: 'Honeycomb',
      Calories: 408,
      Fat: 3.2,
      Carbs: 87,
      Protein: 6.5,
      Sodium: 562,
      Calcium: '0%',
      Iron: '45%'
    },
    {

      Dessert: 'Donut',
      Calories: 452,
      Fat: 25.0,
      Carbs: 51,
      Protein: 4.9,
      Sodium: 326,
      Calcium: '2%',
      Iron: '22%'
    },
    {

      Dessert: 'KitKat',
      Calories: 518,
      Fat: 26.0,
      Carbs: 65,
      Protein: 7,
      Sodium: 54,
      Calcium: '12%',
      Iron: '6%'
    }
  ];
  constructor() { }

  getData(): Array<DessertItem> {
    return this.desertItemsData;
  }

  addItem(item: DessertItem): void {
    this.desertItemsData.push(item);
  }

}
