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
import { TitleService } from './services/title.service';

const appRoutes: Routes = [
  { path: 'groups', canActivate:[AuthGuardService, PendingGuardService], component: GroupsComponent, data: { title: 'Mes Groupes' }},
  { path: 'missions', canActivate:[AuthGuardService, PendingGuardService], component: MissionsComponent, data: { title: 'Mes Missions' } },
  { path: 'dashboard', canActivate:[AuthGuardService], component: DashboardComponent,data: { title: 'Mon Dashboard' } },
  { path: 'work-packages',  canActivate:[AuthGuardService, PendingGuardService], component: WorkpackagesComponent, data: { title: 'Mes Work Packages' }},
  { path: 'workpackage/:id', canActivate:[AuthGuardService, PendingGuardService], component: WorkpackageComponent, data: { title: 'Mes Work Packages > Détail' } },

  { path: 'register', canActivate:[AuthGuardService], component: RegisterComponent, data: { title: 'Inscription' } },
  { path: 'login', canActivate:[AuthGuardService], component: LoginComponent, data: { title: 'Connexion' } },
  { path: 'profile', canActivate:[AuthGuardService, PendingGuardService], component: ProfileComponent, data: { title: 'Mon profil' }},
  { path: 'group/:id', canActivate:[AuthGuardService, PendingGuardService], component: GroupComponent, data: { title: 'Mes Groupes > Détail' }},

  { path: 'not-activated', canActivate:[AuthGuardService], component: NotActivatedComponent, data: { title: 'Utilisateur non activé' }},
  { path: 'not-admin', canActivate:[AuthGuardService], component: NotAdminComponent, data: { title: 'Utilisateur non admin' }},
  { path: 'not-found', canActivate:[AuthGuardService], component : NotFoundComponent, data: { title: 'Page non trouvée' }},

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
export class AppRoutingModule { 
}
