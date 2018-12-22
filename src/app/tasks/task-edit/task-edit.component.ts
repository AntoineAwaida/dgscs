import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from '../../services/task.service';
import { GroupsService } from '../../services/groups.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})

export class TaskEditComponent implements OnInit {

  initialTask;

  createdTask: Task;

  name: String;
  description: String;
  startingDate = new Date();
  endingDate: Date;

  error: string;

  groups_searched: Array<any> = [];
  groups: Array<any> = [];
  groups_selected: Array<any> = [];
  recherche: string;

  isSent = false;
  loader = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private auth : AuthService,
    private groupService: GroupsService) { }

  ngOnInit() {
    //this.getTask();
    //this.getGroups();
   // this.startingDate = new Date();
    //console.log(this.startingDate);
  }


  // getTask(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.taskService.getTask(id)
  //   .subscribe(
  //     (task:any) => {
  //       if(task){
  //         console.log(task);
  //         this.initialTask = task;
  //         this.loader = false;

  //         this.description = task.description;
  //         this.name = task.name;
  //         //this.startingDate.setValue(task.startingDate);
  //         //console.log(task.startingDate);
  //         //this.endingDate = task.endingDate;
  //         this.groups = task.groups; // NON PAS CA

  //       }
  //       else {
  //         console.log("erreur : impossible de récupérer la tâche");
  //         this.router.navigate(['tasks/details/'+id]);
  //       }   
  //     }, (err) => {
  //       console.log("erreur : impossible de récupérer la tâche");
  //       this.router.navigate(['tasks/details/'+id]);
  //     }
  //   )
  // }

  // onSubmit(form: NgForm) {
  //   this.name = form.value['title'];
  //   this.description = form.value['description'];
  //   this.startingDate = form.value['startingDate'];
  //   this.endingDate = form.value['endingDate'];

  //   if (this.endingDate < this.startingDate.value) {
  //     this.error = "Merci de renseigner une date de fin postérieure à celle de début."
  //     setTimeout(() => { this.error = null }, 4000)
  //   }

  //   const groups = this.groups_selected.map((g) => g._id);

  //   const task = {
  //     name: this.name,
  //     description: this.description,
  //     taskID: this.initialTask._id,
  //     groups: groups,
  //     startingDate: this.startingDate,
  //     endingDate: this.endingDate,
  //   }; 

  //   console.log(task);
  //   //this.taskService.createTask(task);
  //   this.isSent = true;
  // }

  // getGroups() {
  //   this.groupService.getGroups().subscribe((res: any) => {
  //     this.groups = res;
  //   },
  //     (error) => {
  //       this.error = error;
  //       console.log(error);
  //     })
  // }

  // onSearch() {

  //   this.groups_searched = [];
  //   if (this.recherche.length >= 2) {


  //     for (let group of this.groups) {

  //       if (group.name.toLowerCase().includes(this.recherche.toLowerCase())) {
  //         this.groups_searched.push(group)
  //       }

  //     }

  //   }

  // }

  // addGroup(group) {
  //   //vérifie d'abord s'il n'y a pas déjà cet utilisateur ajouté à la liste des membres...
  //   if (!this.groups_selected.some(e => e._id == group._id)) {
  //     this.groups_selected.push(group)
  //   }
  //   this.recherche = ''
  //   this.groups_searched = []
  // }

  // deleteGroup(group) {
  //   this.groups_selected = this.groups_selected.filter(item => item != group)
  // }

}