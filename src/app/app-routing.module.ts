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

import { TaskDetailsComponent } from 'src/app/tasks/task-details/task-details.component';
import { TaskFormComponent } from 'src/app/tasks/task-form/task-form.component';
import { TasksComponent } from 'src/app/tasks/task/task.component'
import { AdminGuardService } from './services/admin-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { GroupComponent } from './groups/group/group.component';
import { PendingGuardService } from './services/pending-guard.service';
import { NotActivatedComponent } from './routing-error/not-activated/not-activated.component';
import { NotAdminComponent } from './routing-error/not-admin/not-admin.component';
import { NotFoundComponent } from './routing-error/not-found/not-found.component';

const appRoutes: Routes = [
  { path: 'groups', canActivate:[AuthGuardService, PendingGuardService], component: GroupsComponent},
  { path: 'missions', canActivate:[AuthGuardService, PendingGuardService], component: MissionsComponent },
  { 
    path: 'dashboard', 
    canActivate:[AuthGuardService], 
    component: DashboardComponent,
    data: { title: 'CS3 | dashboard' } 
  },
  { path: 'work-packages',  canActivate:[AuthGuardService, PendingGuardService], component: WorkpackagesComponent },
  { path: 'workpackage/:id', canActivate:[AuthGuardService, PendingGuardService], component: WorkpackageComponent },
  { path: 'register', canActivate:[AuthGuardService], component: RegisterComponent },
  { path: 'login', canActivate:[AuthGuardService], component: LoginComponent },
  { path: 'profile', canActivate:[AuthGuardService, PendingGuardService], component: ProfileComponent},
  { path: 'group/:id', canActivate:[AuthGuardService, PendingGuardService], component: GroupComponent},

  { path: 'not-activated', canActivate:[AuthGuardService], component: NotActivatedComponent},
  { path: 'not-admin', canActivate:[AuthGuardService], component: NotAdminComponent},
  { path: 'not-found', canActivate:[AuthGuardService], component : NotFoundComponent},

  { path: '', pathMatch : 'full', redirectTo : 'dashboard'},

  { path: '**', redirectTo : 'not-found'}
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers : [
    AuthGuardService,
    PendingGuardService,
    AdminGuardService
  ]
})
export class AppRoutingModule { }
