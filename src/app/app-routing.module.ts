import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component'
import { MissionsComponent } from './missions/missions.component'
import { WorkpackagesComponent } from './workpackages/workpackages.component'
import { RegisterComponent } from './auth/register/register.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';

import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'missions', canActivate:[AuthGuardService], component: MissionsComponent },
  { path: 'dashboard', canActivate:[AuthGuardService], component: DashboardComponent },
  { path: 'work-packages',  canActivate:[AuthGuardService], component: WorkpackagesComponent },
  { path: 'tasks',  canActivate:[AuthGuardService], component: TasksComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch : 'full', redirectTo : 'dashboard'},
  // { path : '**', redirectTo : 'not-found'}
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers : [
    AuthGuardService,
  ]
})
export class AppRoutingModule { }
