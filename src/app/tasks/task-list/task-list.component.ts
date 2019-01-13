import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
  import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public tasks: any;
  loader = true;

  constructor(private auth : AuthService, private taskService : TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getMyTasks()
    .subscribe(
      (res) =>{
        this.tasks = res;
        this.loader = false;
      }
    )
  } 

  getStatus(selectedTask) {
    let printStatus = "";
    switch(selectedTask.status){
      case "pending":
        printStatus = "En attente";
        break;
      case "ongoing":
        printStatus = "En cours";
        break; 
      case "done":
        printStatus = "Terminée";
        break;
      default :
        printStatus = "En attente";
    }
    return printStatus;
  }

  isAuthor(task){
    return task.author == this.auth.getPayload()._id;
  }


}
