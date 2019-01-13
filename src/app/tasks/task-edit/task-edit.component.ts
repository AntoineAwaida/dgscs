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

  _id : String = "";
  name : String = "";
  description: String = "";
  startingDate : Date = new Date();
  endingDate: Date =  new Date();

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
    this.getTask();
    this.getGroups();
   // this.startingDate = new Date();
    //console.log(this.startingDate);
  }


  formInvalid() {
    return ((this.name.length == 0)||(this.groups_selected.length == 0)||(this.description.length == 0))
  }

  onSubmit() {

    const groups = this.groups_selected.map((g) => g._id);

    const task = {
      _id: this._id,
      name: this.name,
      description: this.description,
      author: this.auth.getPayload()._id,
      groups: groups,
      startingDate: new Date(this.startingDate),
      endingDate: new Date(this.endingDate)
    }; 

    if (task.endingDate < task.startingDate) {
      alert("Merci de renseigner une date de fin postérieure à celle de début.");
      this.error = "Merci de renseigner une date de fin postérieure à celle de début."
      setTimeout(() => { this.error = null }, 4000)
    }
    else {
      this.isSent = true;
      this.taskService.editTask(task);
    }

  }

  getTask(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id)
    .subscribe(
      (task:any) => {
        if(task){
          console.log(task);
          this.initialTask = task;
          this.loader = false;

          this.description = task.description;
          this.name = task.name;
          this.startingDate = task.startingDate;
          this.endingDate = task.endingDate;
          this.groups_selected = task.groups;
          this._id = id;

        }
        else {
          console.log("erreur : impossible de récupérer la tâche");
          this.router.navigate(['tasks/details/'+id]);
        }   
      }, (err) => {
        console.log("erreur : impossible de récupérer la tâche");
        this.router.navigate(['tasks/details/'+id]);
      }
    )
  }

  getGroups() {
    this.groupService.getGroups().subscribe((res: any) => {
      this.groups = res;
    },
      (error) => {
        this.error = error;
        console.log(error);
      })
  }

  onSearch() {

    this.groups_searched = [];
    if (this.recherche.length >= 2) {


      for (let group of this.groups) {

        if (group.name.toLowerCase().includes(this.recherche.toLowerCase())) {
          this.groups_searched.push(group)
        }

      }

    }

  }

  addGroup(group) {
    //vérifie d'abord s'il n'y a pas déjà cet utilisateur ajouté à la liste des membres...
    if (!this.groups_selected.some(e => e._id == group._id)) {
      this.groups_selected.push(group)
    }
    this.recherche = ''
    this.groups_searched = []
  }

  deleteGroup(group) {
    this.groups_selected = this.groups_selected.filter(item => item != group)
  }


}