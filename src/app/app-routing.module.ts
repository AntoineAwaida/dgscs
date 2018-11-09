import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TasksComponent} from './tasks/tasks.component'

import {MissionsComponent} from './missions/missions.component'

import {WorkpackagesComponent} from './workpackages/workpackages.component'

const routes: Routes = [
   {path: 'tasks', component: TasksComponent},
   {path: 'missions', component: MissionsComponent },
   {path: 'workpackages', component: WorkpackagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
