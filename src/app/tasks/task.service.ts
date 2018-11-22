import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { TASKS } from './mock-tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {// service qui met à jour les tâches

  constructor() { }
  
  getTask(): Observable<Task[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(TASKS);
  }
  getTasks(id: number): Observable<Task>{
    return of(TASKS.find(task=>task.id===id));
  }
}
