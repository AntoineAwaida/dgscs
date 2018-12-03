import { Component, OnInit } from '@angular/core';

import {GroupsService} from '../../services/groups.service'

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.scss']
})
export class AdminGroupsComponent implements OnInit {

  showAddForm: boolean = false;
  constructor(private groupsService: GroupsService) { }

  groups:Array<any> = [];

  async ngOnInit() {
    await this.getGroups();
 
   }
 
   getGroups(){
     this.groupsService.getGroups().subscribe((res: any) => {
       this.groups = res;
       console.log(this.groups)
     },
     (error) => {
       console.log(error);
     })
   }

  toggleAddForm(){
    this.showAddForm = !this.showAddForm
  }

}
