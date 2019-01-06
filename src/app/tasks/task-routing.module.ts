import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../services/auth-guard.service';

import { TasksComponent } from './task/task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { PendingGuardService } from '../services/pending-guard.service';
import { TitleService } from '../services/title.service';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskFileComponent } from './task-file/task-file.component';

const taskRoutes: Routes = [
  {
    path: 'tasks',
    data: { title: 'Mes Tâches' },
    canActivate:[AuthGuardService, PendingGuardService],
    component: TasksComponent,
    children: [
       { path : '', component : TaskListComponent},
       { path: 'add-file', component : TaskFileComponent},
       { path: 'details/:id', component: TaskDetailsComponent, data: { title: 'Mes Tâches > Détail' }},
       { path: 'create-task', component: TaskFormComponent, data: { title: 'Mes Tâches > Créer une tâche' }},
       { path : 'create-task-test', component : CreateTaskComponent, data: { title: 'Mes Tâches > Créer une tâche' }},
       { path: 'edit-task/:id', component: TaskEditComponent, data: { title: 'Mes Tâches > Editer une tâche' }}
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
export class TaskRoutingModule {}
