import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderStateService {
  showHeader:boolean;
  constructor() { }
}
