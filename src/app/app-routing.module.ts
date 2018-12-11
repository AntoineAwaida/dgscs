import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissionsComponent } from './missions/missions.component'
import { WorkpackagesComponent } from './workpackages/workpackages.component'
import { RegisterComponent } from './auth/register/register.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminGroupsComponent } from './admin/admin-groups/admin-groups.component'
import { GroupsComponent } from './groups/groups.component';



import { AuthGuardService } from './services/auth-guard.service';
import { WorkpackageComponent } from './workpackages/workpackage/workpackage.component';

import {TaskDetailsComponent} from 'src/app/tasks/task-details/task-details.component';
import { TaskFormComponent } from 'src/app/tasks/task-form/task-form.component';
import { TasksComponent } from 'src/app/tasks/task/task.component'

const appRoutes: Routes = [
  { path: 'groups', canActivate:[AuthGuardService], component: GroupsComponent},
  { path: 'missions', canActivate:[AuthGuardService], component: MissionsComponent },
  { path: 'dashboard', canActivate:[AuthGuardService], component: DashboardComponent },
  { path: 'work-packages',  canActivate:[AuthGuardService], component: WorkpackagesComponent },
  { path: 'workpackage/:id', canActivate:[AuthGuardService], component: WorkpackageComponent },
  { path: 'register', canActivate:[AuthGuardService], component: RegisterComponent },
  { path: 'login', canActivate:[AuthGuardService], component: LoginComponent },
  {path : 'tasks', component : TasksComponent},



  // tous les paths qui concernent le tableau des tâches
  { path: 'detail/:id', component: TaskDetailsComponent },
  {path : 'formulaire', component : TaskFormComponent},

  
  { path: '', pathMatch : 'full', redirectTo : 'dashboard'},
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers : [
    AuthGuardService,
  ]
})
export class AppRoutingModule { }
