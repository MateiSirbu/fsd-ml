import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DessertsComponent } from './components/desserts/desserts.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'forgot', component: ForgotComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
