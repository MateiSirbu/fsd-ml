import { Component } from '@angular/core';
import {HeaderStateService} from '../../service/header-state.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'FSD';

  constructor(public headerService: HeaderStateService) {
   }
}
