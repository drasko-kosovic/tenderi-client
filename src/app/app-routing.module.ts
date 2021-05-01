import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import { UsersComponent } from './auth/users/users.component';

const routes: Routes = [
  {
    path: 'tender',
    loadChildren: () => import('./tender/tender.module').then(m => m.TenderModule)
  },
  {
    path: 'pregovaracki',
    loadChildren: () => import('./pregovaracki/pregovaracki.module').then(m => m.PregovarackiModule)
  },
  {
    path: 'jednostavne',
    loadChildren: () => import('./jednostavne/jednostavne.module').then(m => m.JednostavneModule)
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'users', component: UsersComponent},
  { path: '**',
    component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



