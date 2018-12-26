import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../services/auth-guard.service';

import { TasksComponent } from './task/task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { PendingGuardService } from '../services/pending-guard.service';

const taskRoutes: Routes = [
  {
    path: 'tasks',
    data: { title: 'Mes Tâches' },
    canActivate:[AuthGuardService, PendingGuardService],
    component: TasksComponent,
    children: [
       { path : '', component : TaskListComponent},
       { path: 'details/:id', component: TaskDetailsComponent },
       { path: 'create-task', component: TaskFormComponent },
       { path: 'edit-task/:id', component: TaskEditComponent }
    ],
    
  }

]
@NgModule({
  imports: [RouterModule.forRoot(taskRoutes)],
  exports: [RouterModule],
  providers : [
    AuthGuardService,
    PendingGuardService
  ],
})
export class TaskRoutingModule { }
