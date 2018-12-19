import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../../services/task.service';

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

  constructor() { }
 
  ngOnInit() {

  }

 
}