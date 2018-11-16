import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import { AdminGroupsComponent } from './admin-groups/admin-groups.component';
import { AuthGuardService } from '../services/auth-guard.service';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
       { path: 'groups', component: AdminGroupsComponent },
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
