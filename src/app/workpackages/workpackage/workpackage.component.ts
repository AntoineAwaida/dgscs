import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkpackagesService, WorkPackage } from 'src/app/services/workpackages.service';

import { Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';






@Component({
  selector: 'app-workpackage',
  templateUrl: './workpackage.component.html',
  styleUrls: ['./workpackage.component.scss']
})
export class WorkpackageComponent implements OnInit, OnDestroy {


  message:string;
  workpackage$: WorkPackage
  mywp:Array<WorkPackage>

  constructor(private route: ActivatedRoute, private router: Router, private workpackageService: WorkpackagesService, private userService: UserService, private auth: AuthService
    , private chatService:ChatService ) { 
      
    // this.reuseRoute(false);

     }

  ngOnInit() {


    this.route.paramMap.pipe(switchMap((params:ParamMap) => this.workpackageService.getWorkPackage(params.get('id'))))
      .subscribe((res:any) => {
        
        this.workpackage$ = res

      } , (error)=> console.log(error));

    this.getWorkPackages();
  }

  ngOnDestroy() {
    // this.reuseRoute(true);
  }

  getWorkPackages(){
    
    this.userService.getWorkPackages(this.auth.getPayload()._id).subscribe((res:any)=> {
  
        this.mywp = res;
  
    },
      (error => {
        console.log(error)
      })
      )
  
  }

  reuseRoute(bool : boolean) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return bool;
   }
  }

  leaveChat(){

    this.chatService.leaveRoom(this.workpackage$._id);

  }


}
