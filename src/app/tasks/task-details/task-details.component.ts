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


  onSelect(task: Task): void {
    this.selectedTask = task;
  }
  
  onClickOpenSelect(){
    this.openSelect=!this.openSelect;  
    }

    onSelectStatus(statusChosen: string){
      this.selectedTask.status = statusChosen;
      console.log(statusChosen);
      this.openSelect = false;
    }
    
}
