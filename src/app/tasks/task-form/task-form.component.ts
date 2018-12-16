import { Component, OnInit } from '@angular/core';
import {Task} from '../task';
import {NgForm, FormGroup} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent implements OnInit {

createdTask : Task;
name : String;
description : String;
startingDate : Date;
endingDate : Date;
error:string;

constructor(private auth : AuthService, private taskService : TaskService){}

  onSubmit(form : NgForm) {
   this.name=form.value['title'];
   this.description=form.value['description'];
   this.startingDate=form.value['startingDate'];
   this.endingDate=form.value['endingDate'];

   if (this.endingDate < this.startingDate){
     this.error ="Merci de renseigner une date de fin postérieure à celle de début."
     setTimeout(() => {this.error=null}, 4000)
   } 

  // console.log(this.startingDate);
  // console.log(this.endingDate);
  // console.log(this.name);
  // console.log(this.description);

  const task = {
    name : this.name,
    description : this.description,
    author : this.auth.getPayload()._id,
    groups : [],
    startingDate : this.startingDate,
    endingDate : this.endingDate,
  };
  
  this.taskService.createTask(task);
}

  ngOnInit() {
  }}