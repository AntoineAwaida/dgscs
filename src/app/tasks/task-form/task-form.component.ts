import { Component, OnInit } from '@angular/core';
import {Task} from '../task';
import {NgForm, FormGroup} from '@angular/forms';


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

  onSubmit(form : NgForm) {
   this.name=form.value['title'];
   this.description=form.value['description'];
   this.startingDate=form.value['startingDate'];
   this.endingDate=form.value['endingDate'];
  console.log(this.startingDate);
  console.log(this.endingDate);
  console.log(this.name);
  console.log(this.description);
}
onDate(form : NgForm){
  this.startingDate=form.value['startingDate'];
}
  ngOnInit() {
  }}