import { Component, OnInit, ViewChild } from '@angular/core';

import {GroupsService} from '../../services/groups.service'

import { MatTableDataSource, MatPaginator } from '@angular/material'


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

  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  msg:string;
  error:string;

  ready:boolean = false;


  
  group_to_edit:string;
  
  showAddForm: boolean = false;
  showTable:boolean = true;

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
    this.groups_array = []
    this.groupsService.getGroups().subscribe((res: any) => {
    this.groups = res;
    this.groups.forEach((e)=> {
      let user = "";
      for(let i=0; i<e.members.length-1; i++){
        let member = e.members[i];
        user += member.first_name + ", ";
      }
      user += e.members[e.members.length-1].first_name

      let group = createGroup({name:e.name,members:user, id:e._id})
      this.groups_array.push(group)
    })
    this.dataSource = new MatTableDataSource(this.groups_array);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.ready = true;
    },
    (error) => {
      this.error = error;
      console.log(error);
    })
  }

   delete(id){
     const result = confirm("Voulez-vous vraiment supprimer ce groupe?")
     if (result){
      this.groupsService.deleteGroup(id).subscribe((res:any) => {
        this.msg = res;
        setTimeout(() => {this.msg=null}, 4000)
        this.getGroups()
       },
       (error)=> {
         this.error = error;
         setTimeout(() => {this.error=null}, 4000)
       })


     }
     
   }

  toggleEditForm(groupid){
    this.showAddForm = !this.showAddForm
    this.showTable = !this.showTable
    this.group_to_edit = groupid
  }

  toggleAddForm(){
    this.showAddForm = !this.showAddForm
    this.showTable = !this.showTable
    this.group_to_edit = null;
  }

  onSubmitted(msg){
    this.toggleAddForm()
    this.msg = msg;
    setTimeout(() => {this.msg = null}, 4000);
    this.getGroups()
  }

}
