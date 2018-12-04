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

  constructor(private groupsService: GroupsService, private userService: UserService) { }

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
}
