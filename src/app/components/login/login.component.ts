import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import {HeaderStateService} from '../../service/header-state.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  profileForm = new FormGroup({
    userName: new FormControl("",[Validators.minLength(2),Validators.required]),
    password: new FormControl("",[Validators.minLength(8),Validators.required])
  });
  constructor(private userService: UserService , public headerService: HeaderStateService) {
    this.headerService.showHeader = false;
   }

  ngOnInit(): void {
  }

  loginClick(): void{
    this.userService.login(this.profileForm.getRawValue())
    this.headerService.showHeader = true;
  }
}
