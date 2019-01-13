import { Component, OnInit, Input } from '@angular/core';
import { Task, TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material';
import { AddTaskDialogComponent } from 'src/app/workpackages/workpackage/add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-task-tasks',
  templateUrl: './task-tasks.component.html',
  styleUrls: ['./task-tasks.component.scss']
})
export class TaskTasksComponent implements OnInit {


  @Input() task : any;

  constructor(public dialog: MatDialog, public taskService: TaskService) { }

  ngOnInit() {


  }

  openDialog(e):void {


    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: {id : e, tasks: this.task.tasks, type:'task'}
    })


    dialogRef.afterClosed().subscribe(result => {

      if (result){
        this.task.tasks = this.task.tasks.concat(result);
      }
      
    },(error)=> console.log(error));

  }

  delete(task_to_delete_id, thistaskid):void {

    const result = confirm("Voulez-vous vraiment détacher cette tâche du workpackage?")

    if(result){

      this.taskService.deleteLinkTask({task1: task_to_delete_id, task2: thistaskid}).subscribe((res:any) => {

        this.task.tasks = this.task.tasks.filter (e => e._id != task_to_delete_id
          );

      }, (error)=> (console.log(error)));

    }

  }

}
