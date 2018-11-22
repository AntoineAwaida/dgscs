import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TasksComponent implements OnInit {
  tasks : Task[];
  constructor(private taskService: TaskService ) { }
 
  ngOnInit() {
    this.getTasks();
  }
 
  getTasks(): void {
    this.taskService.getTask().subscribe(tasks => this.tasks = tasks);
  } 

 
}