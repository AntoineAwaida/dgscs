import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { WorkPackage } from '../services/workpackages.service'

@Component({
  selector: 'app-workpackages',
  templateUrl: './workpackages.component.html',
  styleUrls: ['./workpackages.component.scss']
})
export class WorkpackagesComponent implements OnInit {

  mywp:Array<WorkPackage>;

  constructor(public auth: AuthService, private userService: UserService) { }

  ngOnInit() {
  
    this.getWorkpackages();

  }

  getWorkpackages(){
    
    this.userService.getWorkPackages(this.auth.getPayload()._id).subscribe((res:any)=> {

      this.mywp = res;

    },
    (error => {
      console.log(error)
    })
    )

  }

}
