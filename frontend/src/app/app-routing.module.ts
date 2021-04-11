import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UploadComponent } from './components/upload/upload.component';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { routeIndex: 0 } },
  { path: 'signup', component: SignupComponent, data: { routeIndex: 1 } },
  { path: 'forgot', component: ForgotComponent, data: { routeIndex: 2 } },
  { path: 'home', component: HomeComponent, data: { routeIndex: 3 }, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, data: { routeIndex: 4 }, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent, data: { routeIndex: 5 }, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }