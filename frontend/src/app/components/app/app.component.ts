import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenManagerService } from 'src/app/services/token-manager.service';
import { HeaderStateService } from '../../services/header-state.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('animRoutes', [
      transition(':decrement', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
        group([
          query(':enter', [style({ transform: 'translateY(-100%)' }), animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))], { optional: true }),
          query(':leave', [style({ transform: 'translateY(0%)' }), animate('0.5s ease-in-out', style({ transform: 'translateY(100%)' }))], { optional: true }),
        ]),
      ]),
      transition(':increment', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
        group([
          query(':enter', [style({ transform: 'translateY(100%)' }), animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))], { optional: true }),
          query(':leave', [style({ transform: 'translateY(0%)' }), animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)' }))], { optional: true }),
        ]),
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  constructor(
    public headerService: HeaderStateService,
    private router: Router,
    private route: ActivatedRoute,
    public token: TokenManagerService) { }

  public animationState: number;

  ngOnInit() { }

  onActivate($event) {
    this.animationState = this.route.firstChild.snapshot.data['routeIndex']
  }

  logOut() {
    this.token.deleteToken()
  }
}
