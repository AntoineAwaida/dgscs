import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import { AdminGroupsComponent } from './admin-groups/admin-groups.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminWorkpackagesComponent } from './admin-workpackages/admin-workpackages.component';
import { AdminGuardService } from '../services/admin-guard.service';
import { TitleService } from '../services/title.service';
import { AdminAnnouncesComponent } from './admin-announces/admin-announces.component';
import { AdminRapportsComponent } from './admin-rapports/admin-rapports.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    data : { title : 'Admin'},
    canActivate:[AdminGuardService],
    component: AdminDashboardComponent,
    children: [
       { path: 'groups', component: AdminGroupsComponent, data : { title : 'Admin > Groupes'} },
       { path: 'users', component: AdminUsersComponent, data : { title : 'Admin > Utilisateurs'} }, 
       { path: 'workpackages', component: AdminWorkpackagesComponent, data : { title : 'Admin > Work-Packages'}},
       { path: 'announces', component: AdminAnnouncesComponent, data : { title : 'Admin > Annonces'}},
       { path: 'rapports', component: AdminRapportsComponent, data : { title : 'Admin > Compte-rendus'}}
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(adminRoutes)],
  exports: [RouterModule],
  providers : [
    AdminGuardService
  ],
})
export class AdminRoutingModule {}
