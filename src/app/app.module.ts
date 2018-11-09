import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material'

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { MissionsComponent } from './missions/missions.component';
import { WorkpackagesComponent } from './workpackages/workpackages.component';
import { GroupsComponent } from './groups/groups.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: 'missions', component: MissionsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'work-packages', component: WorkpackagesComponent },
  { path: 'tasks', component: TasksComponent },
  // { path : 'not-found', component : FourOhFourComponent},
  { path: '', pathMatch : 'full', redirectTo : 'dashboard'},
  // { path : '**', redirectTo : 'not-found'}
]

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    MissionsComponent,
    WorkpackagesComponent,
    GroupsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MaterialModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
