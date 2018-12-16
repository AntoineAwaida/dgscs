import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import { AdminGroupsComponent } from './admin-groups/admin-groups.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminWorkpackagesComponent } from './admin-workpackages/admin-workpackages.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
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
  ],
})
export class AdminRoutingModule { }
