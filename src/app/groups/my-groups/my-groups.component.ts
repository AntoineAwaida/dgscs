import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {

  groups;
  loader = true;

  constructor(private groupsService : GroupsService) { }

  ngOnInit() {
    this.getMyGroups();
  }

  getMyGroups() {
    this.groupsService.getMyGroups().subscribe( res => {
      this.groups = res;
      this.loader = false;
    }, err => {
      console.log(err);
    })
  }

}
