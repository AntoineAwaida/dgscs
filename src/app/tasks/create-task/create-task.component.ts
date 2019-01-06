import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from '../../services/task.service';
import { GroupsService } from '../../services/groups.service'

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {


  createdTask: Task;
  name: String;
  description: String;
  startingDate: Date;
  endingDate: Date;
  error: string;

  groups_searched: Array<any> = [];
  groups: Array<any> = [];
  groups_selected: Array<any> = [];
  recherche: string;

  isSent = false;
  startingDateControl;

  constructor(private auth: AuthService, private taskService: TaskService, private groupService: GroupsService) { }

  ngOnInit() {
    this.getGroups();
    this.startingDateControl = new FormControl(new Date());
    this.startingDate = new Date();
  }

  onSubmit(form: NgForm) {
    this.name = form.value['title'];
    this.description = form.value['description'];
    this.startingDate = form.value['startingDate'];
    this.endingDate = form.value['endingDate'];


    const groups = this.groups_selected.map((g) => g._id);

    const task = {
      name: this.name,
      description: this.description,
      author: this.auth.getPayload()._id,
      groups: groups,
      startingDate: this.startingDate,
      endingDate: this.endingDate,
    }; 

    if (this.endingDate < this.startingDate) {
      alert("Merci de renseigner une date de fin postérieure à celle de début.");
      this.error = "Merci de renseigner une date de fin postérieure à celle de début."
      setTimeout(() => { this.error = null }, 4000)
    }
    else {
      this.taskService.createTask(task);
      this.isSent = true;
    }
    //console.log(task);

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