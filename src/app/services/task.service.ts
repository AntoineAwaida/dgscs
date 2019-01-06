import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../tasks/task';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { api, server } from './../constants';

export interface Task {

  _id?:string,
  name:String,
  author:string,
  description:String,
  groups:[string],
  startingDate:Date,
  endingDate:Date,
  status:String


}
@Injectable({
  providedIn: 'root'
})
export class TaskService {// service qui met à jour les tâches

  constructor(private auth : AuthService, private httpClient: HttpClient, private router: Router) { }
  
  getTasks(): Observable<any> {
    return this.httpClient.get(api+"tasks/gettasks/"+this.auth.getPayload()._id);

  }

  getTask(id : string) : Observable<any>  {
    return this.httpClient.post(api+"tasks/gettask/"+this.auth.getPayload()._id, { taskID : id });
  }

  createTask(task){
    this.httpClient.post(api+"tasks/createtask/", task).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['tasks']);
      }, (err)=> {
        console.log(err);
      }
    )
  }

  editTaskStatus(id: string, status: string) : Observable<any>  {
    return this.httpClient.put(api+"tasks/edittaskstatus/"+this.auth.getPayload()._id, { taskID : id, status : status });
  }

}
