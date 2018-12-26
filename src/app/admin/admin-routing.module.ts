import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import { AdminGroupsComponent } from './admin-groups/admin-groups.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminWorkpackagesComponent } from './admin-workpackages/admin-workpackages.component';
import { AdminGuardService } from '../services/admin-guard.service';
import { TitleService } from '../services/title.service';

const adminRoutes: Routes = [
  {
    path: 'admin',
    data : { title : 'Admin'},
    canActivate:[AdminGuardService],
    component: AdminDashboardComponent,
    children: [
       { path: 'groups', component: AdminGroupsComponent, data : { title : 'Admin > Groupes'} },
       { path: 'users', component: AdminUsersComponent, data : { title : 'Admin > Utilisateurs'} }, 
       { path: 'workpackages', component: AdminWorkpackagesComponent, data : { title : 'Admin > Work-Packages'}}
    ]
  }
  // { path : '**', redirectTo : 'not-found'}
]
@NgModule({
  imports: [RouterModule.forRoot(adminRoutes)],
  exports: [RouterModule],
  providers : [
    AdminGuardService,
    TitleService,
  ],
})
export class AdminRoutingModule {
  constructor(private titleService: TitleService) {
    this.titleService.init();
  }
 }
