import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import { AdminGroupsComponent } from './admin-groups/admin-groups.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminWorkpackagesComponent } from './admin-workpackages/admin-workpackages.component';
import { AdminGuardService } from '../services/admin-guard.service';

const adminRoutes: Routes = [
  {
    path: 'admin',
    canActivate:[AdminGuardService],
    component: AdminDashboardComponent,
    children: [
       { path: 'groups', component: AdminGroupsComponent },
       { path: 'users', component: AdminUsersComponent }, 
       { path: 'workpackages', component: AdminWorkpackagesComponent}
    ]
  }
  // { path : '**', redirectTo : 'not-found'}
]
@NgModule({
  imports: [RouterModule.forRoot(adminRoutes)],
  exports: [RouterModule],
  providers : [
    AuthGuardService,
    AdminGuardService
  ],
})
export class AdminRoutingModule { }
