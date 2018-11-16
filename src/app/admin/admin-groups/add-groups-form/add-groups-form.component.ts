import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-add-groups-form',
  templateUrl: './add-groups-form.component.html',
  styleUrls: ['./add-groups-form.component.scss']
})
export class AddGroupsFormComponent implements OnInit {

  @Input() displayed:boolean;
  sent:boolean = false;
  members:Array<String> = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(f) {

    const group = {
      name: f.value.name,
      members: this.members
    }

    console.log(group)

    //this.boxService.postBox(box);

    this.sent = true;


  }

  /*
  getUsers() {
    this.userService.getUsers()
    .subscribe((res:any) => {
      const users = res.data.users;
      console.log(users);
    },(error) => {
      console.log(error);
      console.log("impossible de reçevoir user");
    })
  }
  */


}
