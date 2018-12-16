import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { TASKS } from './mock-tasks';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {// service qui met à jour les tâches

  constructor(private auth : AuthService, private httpClient: HttpClient, private router: Router) { }
  
  getTask(): Observable<any> {
    return this.httpClient.get("http://localhost:3000/api/tasks/gettasks/"+this.auth.getPayload()._id);

  }
  getTasks(id: number): Observable<Task>{
    return of(TASKS.find(task=>task.id===id));

  }

  createTask(task){
    this.httpClient.post("http://localhost:3000/api/tasks/createtask/", task).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['tasks']);
      }
    )
  }

}
