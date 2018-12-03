import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { UserService } from '../services/user.service';


import { tap,flatMap } from 'rxjs/operators'

import { forkJoin } from 'rxjs';





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
    this.groupsService.getGroups().pipe(
      flatMap((groups: any[]) => {
        let members = groups.map(grp => grp.members)
                            .reduce((res, arr) => res.concat(arr), [])
                            .map(member => this.userService.getUser(member))
        return forkJoin(members);
        
      })
    ).subscribe(u => console.log(u))
  }
}
