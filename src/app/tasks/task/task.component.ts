import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

export interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TasksComponent implements OnInit {
  tasks : Task[];
  selectedTask : Task;
 
  openSelect=false;

  constructor(private taskService: TaskService ) { }
 
  ngOnInit() {
    this.getTasks();
  }
  onSelect(task: Task): void {
    this.selectedTask = task;
  }
  onClickOpenSelect(){
    this.openSelect=!this.openSelect;  
    }

  getTasks(): void {
    this.taskService.getTask()
    .subscribe(
      (res) =>{
        console.log(res);
        this.tasks = res;
        if(this.tasks.length>0)
          this.selectedTask = this.tasks[0];
      }
    )
  } 

  onSelectStatus(statusChosen: string){
    this.selectedTask.status = statusChosen;
    console.log(statusChosen);
    this.openSelect = false;
  }
 
}