import { Routes } from '@angular/router';
import { Salaries } from './pages/Salaries/Salaries';
import { Login } from './pages/Login/Login';
import { SignIn } from './pages/Sign-in/Sign-in';
import { CreateSalary } from './pages/Create-salary/Create-salary';

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
    path: 'sign-in',
    component: SignIn
  },
  {
    path: 'create-salary',
    component: CreateSalary
  },
  {
    path: '**',
    redirectTo: ''
  }
];
