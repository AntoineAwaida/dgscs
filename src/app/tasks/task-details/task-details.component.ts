import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/tasks/task';
import { TaskService } from 'src/app/tasks/task.service';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  selectedTask: any;
  openSelect = false;
  loader = true;
  initialStatus;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.getTask();
  }
 
  // getTask2(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.taskService.getTasks()
  //   .subscribe(
  //     (tasks:any) => {
  //       const task = tasks.find( (task) => task._id === id);
  //       if(task){
  //         console.log(task);
  //         this.selectedTask = task;
  //         this.loader = false;
  //       }
  //       else {
  //         console.log("erreur : impossible de récupérer la tâche");
  //         this.router.navigate(['tasks']);
  //       }   
  //     }, (err) => {
  //       console.log("erreur : impossible de récupérer la tâche");
  //       this.router.navigate(['tasks']);
  //     }
  //   )
  // }

  getTask(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id)
    .subscribe(
      (task:any) => {
        if(task){
          console.log(task);
          this.selectedTask = task;
          this.loader = false;
          this.initialStatus = task.status;
        }
        else {
          console.log("erreur : impossible de récupérer la tâche");
          this.router.navigate(['tasks']);
        }   
      }, (err) => {
        console.log("erreur : impossible de récupérer la tâche");
        this.router.navigate(['tasks']);
      }
    )
  }


  
  onClickOpenSelect(){
    this.openSelect=!this.openSelect;  
    }

   onSelectStatus(){
      this.loader = true;
      
      //Enregistrer dans la base de donnée
      this.taskService.editTask(this.selectedTask._id, this.selectedTask.status).subscribe( (res) => {
        this.loader = false;
        this.openSelect = false;
        console.log("statut modifié !");
      }, (err) => {
        console.log(err);
        this.loader = false;
        alert("Impossible de modifier le statut !");
      })
  }

  onCancelStatus(){
    this.openSelect = false;
    this.selectedTask.status = this.initialStatus;
}

  getStatus() {
    let printStatus = "";
    switch(this.selectedTask.status){
      case "pending":
        printStatus = "En attente";
        break;
      case "ongoing":
        printStatus = "En cours";
        break; 
      case "done":
        printStatus = "Terminée";
        break;
      default :
        printStatus = "En attente";
    }
    return printStatus;
  }
    
}
