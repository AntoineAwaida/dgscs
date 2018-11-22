import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissionsComponent } from './missions/missions.component'
import { WorkpackagesComponent } from './workpackages/workpackages.component'
import { RegisterComponent } from './auth/register/register.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminGroupsComponent } from './admin/admin-groups/admin-groups.component'
import { GroupsComponent } from './groups/groups.component';

import {TaskDetailsComponent} from 'src/app/tasks/task-details/task-details.component';
import { TaskFormComponent } from 'src/app/tasks/task-form/task-form.component';


import { AuthGuardService } from './services/auth-guard.service';
import { TasksComponent } from './tasks/task/task.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'groups', component: GroupsComponent},
  { path: 'missions', component: MissionsComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'work-packages',   component: WorkpackagesComponent },
  
  //canActivate:[AuthGuardService]

  // tous les paths qui concernent le tableau des tâches
  { path: 'detail/:id', component: TaskDetailsComponent },
  {path : 'formulaire', component : TaskFormComponent},
  {path : 'tasks', component : TasksComponent},
  
  
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
