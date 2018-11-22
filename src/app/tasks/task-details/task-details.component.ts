import { Component, OnInit } from '@angular/core';
import {Task} from 'src/app/tasks/task';
import {TaskService} from 'src/app/tasks/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  task: Task;
 
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}
 
  ngOnInit(): void {
    this.getTask();
  }
 
  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTasks(id).subscribe(task => this.task = task);
  }

}
