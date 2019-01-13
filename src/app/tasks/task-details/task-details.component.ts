import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/tasks/task';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { server } from '../../constants';
import { WorkPackage } from 'src/app/services/workpackages.service';
import { flatMap } from 'rxjs/operators';

 
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
  taskID;
  linked_wp: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private auth : AuthService
  ) {}
 
  ngOnInit(): void {
    this.getTask();

  }


  addFile(file) {
    console.log(file);
    this.selectedTask.files.push(file);
  }

  getTask(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.taskID = id;
    
    this.taskService.getTask(id).pipe(
    flatMap((task:any)=>(this.selectedTask = task) && (this.initialStatus = task.status) && (this.taskService.getWP(task._id)))) 
    .subscribe((res:any)=> {
      this.linked_wp = res;
      this.loader = false;
    }, (err) => {
      console.log("erreur : impossible de récupérer les wp ou les tâches liés.");
      this.router.navigate(['tasks']);
    })
  }

  getWP(taskid) :void {

    this.taskService.getWP(taskid).subscribe((res:any)=> {
      console.log(res)
    })

  }


  getFile(file){
    return server+'/api/files/'+file.fileURL
  }

  onClickOpenSelect(){
    this.openSelect=!this.openSelect;  
    }

   onSelectStatus(){
     if(this.selectedTask.status!=this.initialStatus){

      this.loader = true;
      //Enregistrer dans la base de donnée
      this.taskService.editTaskStatus(this.selectedTask._id, this.selectedTask.status).subscribe( (res) => {
        this.loader = false;
        this.openSelect = false;
        this.initialStatus = this.selectedTask.status;
        console.log("statut modifié !");
      }, (err) => {
        console.log(err);
        this.loader = false;
        alert("Impossible de modifier le statut !");
      })
    } else {
      this.openSelect = false;
    }
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
    

  isAuthor(){
    return this.selectedTask.author._id == this.auth.getPayload()._id;
  }
}
