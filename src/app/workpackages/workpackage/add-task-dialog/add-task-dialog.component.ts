import { Component, OnInit, Inject } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Task, TaskService } from 'src/app/services/task.service';
import { WorkpackagesService } from 'src/app/services/workpackages.service';

export interface DialogData {
  id:string
}

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit {

  tasks: Array<Task> = [];
  element_searched: Array<Task> = [];

  element_selected: Array<Task> = [];

  recherche:string;

  error:string;

  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private taskService: TaskService, private workpackageService: WorkpackagesService) { }

  ngOnInit() {

    this.getTasks();
  }

  onNoClick(): void {
    this.dialogRef.close();

  }

  getTasks(){
    
    this.taskService.getTasks().subscribe((res:any)=> {

      this.tasks = res;


    },
    (error => {
      console.log(error)
    })
    )

  }

  onSubmit(id){

    console.log(id)

    let tasks = [];

    this.element_selected.forEach((e)=> {

      tasks.push(e._id);

    })

    this.workpackageService.addTasks({tasks:tasks}, id).subscribe((res:any) => this.dialogRef.close(), (error) => this.error = error);


    


  }

  onSearch() {

    this.element_searched = [];
    if (this.recherche.length>=2){

      for (let task of this.tasks) {

        if (task.name.toLowerCase().includes(this.recherche.toLowerCase())){
          this.element_searched.push(task);
        }

      }
      
    }


  
  }

  addElement(element){
    if (!this.element_selected.some(e => (e._id == element._id))){
      this.element_selected.push(element)
    }
      this.recherche = ''
      this.element_searched = []
  }

}
