import { Component, OnInit } from '@angular/core';

import {GroupsService} from '../../services/groups.service'

import { MatTableDataSource } from '@angular/material'


export interface Group {
  name:string;
  members:string;
  id:string;
}


function createGroup(config: Group): {name:string; members:string; id:string}{
  let group = {name: config.name, members: config.members, id:config.id}
  return group
};


@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.scss']
})
export class AdminGroupsComponent implements OnInit {

  

  
  
  msg:string;
  error:string;

  showAddForm: boolean = false;
  constructor(private groupsService: GroupsService) { }

  groups:Array<any> = [];

  groups_array:Group[] = [];

  displayedColumns: string [] = ['name','members', 'actions']

  dataSource = new MatTableDataSource(this.groups_array);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  

  async ngOnInit() {
    await this.getGroups();
 
   }
 
   getGroups(){
     this.groupsService.getGroups().subscribe((res: any) => {
      this.groups = res;
      this.groups.forEach((e)=> {
        let user = "";
        e.members.forEach((member)=> {
          user+= member.first_name + ",";
        })
        let group = createGroup({name:e.name,members:user, id:e._id})
        this.groups_array.push(group)
      })
      console.log(this.groups_array)
      this.dataSource = new MatTableDataSource(this.groups_array);
     },
     (error) => {
       console.log(error);
     })
   }

   delete(id){
     const result = confirm("Voulez-vous vraiment supprimer ce groupe?")
     if (result){
      this.groupsService.deleteGroup(id).subscribe((res:any) => {
        this.msg = res;
        setTimeout(() => {this.msg=null}, 4000)
       },
       (error)=> {
         this.error = error;
         setTimeout(() => {this.error=null}, 4000)
       })


     }
     
   }

  toggleAddForm(){
    this.showAddForm = !this.showAddForm
  }

}
