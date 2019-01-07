import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-task-file-edit-dialog',
  templateUrl: './task-file-edit-dialog.component.html',
  styleUrls: ['./task-file-edit-dialog.component.scss']
})
export class TaskFileEditDialogComponent implements OnInit {

  name : string;
  description : string;

  constructor(private dialogRef: MatDialogRef<TaskFileEditDialogComponent> ) {}

  ngOnInit() { 
  }

}
