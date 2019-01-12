import { Component, OnInit, Inject } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Task, TaskService } from 'src/app/services/task.service';
import { WorkpackagesService } from 'src/app/services/workpackages.service';

export interface DialogData {
  id:string,
  wptasks: Array<Task>
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

    this.getMyTasks();
  }

  onNoClick(): void {
    this.dialogRef.close();

  }

  getMyTasks(){
    
    this.taskService.getMyTasks().subscribe((res:any)=> {


      this.tasks = res;


    },
    (error => {
      console.log(error)
    })
    )

  }

  onSubmit(id){


    let tasks = [];

    this.element_selected.forEach((e)=> {

      tasks.push(e._id);

    })

    this.workpackageService.addTasks({tasks:tasks}, id).subscribe((res:any) => this.dialogRef.close(this.element_selected), (error) => this.error = error);


    


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
      if (!this.data.wptasks.some(e => e._id == element._id)){
        this.element_selected.push(element)
        this.error =null
      }
      else {
        this.error ="Cette tâche est déjà liée à ce WP!"
        setTimeout(() => this.error = null, 2000)
      }
     
    }
      this.recherche = ''
      this.element_searched = []
  }

}
