import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups:Array<any> = [];

  constructor(private groupsService: GroupsService, public userService: UserService) { }

  ngOnInit() {
    this.getGroups();
  }

  getGroups(){
    this.groupsService.getGroups().subscribe((res:any) => {
      this.groups = res;
    },(error) => {
      console.log(error);
      console.log("impossible de reçevoir les groupes.");
    })
  

  }
  
}
