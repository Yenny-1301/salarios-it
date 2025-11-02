import { Routes } from '@angular/router';
import { Salaries } from './pages/Salaries/Salaries';
import { Login } from './pages/Login/Login';
import { SignIn } from './pages/Sign-in/Sign-in';

export const routes: Routes = [
  {
    path: '',
    component: Salaries
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'signin',
    component: SignIn
  },
  {
    path: '**',
    redirectTo: ''
  }
];
