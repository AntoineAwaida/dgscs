import { Component, OnInit } from '@angular/core';
import {Task} from '../task';
import {NgForm} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { DatepickerModule } from 'angular-mat-datepicker';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  model = new Task(11,"blabla","descprtion","01/10","10/10");
  titre = "";
  
  onSubmit(form: NgForm ) {
    console.log(form.value);
    console.log(this.titre);
}

  ngOnInit() {
  }
// TODO: Remove this when we're done
get diagnostic() { return JSON.stringify(this.model); }
}
