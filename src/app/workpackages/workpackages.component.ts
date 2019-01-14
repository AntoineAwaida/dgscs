import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { WorkPackage } from '../services/workpackages.service'
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-workpackages',
  templateUrl: './workpackages.component.html',
  styleUrls: ['./workpackages.component.scss']
})
export class WorkpackagesComponent implements OnInit {

  mywp:Array<WorkPackage>;

  ready:boolean = false;

  constructor(public auth: AuthService, private userService: UserService, private chatService:ChatService) { }

  ngOnInit() {
  
    this.getMyWorkpackages();

  }

  getMyWorkpackages(){
    
    this.userService.getMyWorkPackages().subscribe((res:any)=> {

      this.mywp = res;
      this.ready = true;

    },
    (error => {
      console.log(error)
    })
    )

  }

}
