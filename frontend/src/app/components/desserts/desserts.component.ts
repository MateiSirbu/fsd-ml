import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
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

  constructor(private service: DessertListMockService,
    private userService: UserService,
    private router: Router) {
    if (!this.userService.isLoggedIn())
      this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.dessertsItems = this.service.getData();
  }

}
