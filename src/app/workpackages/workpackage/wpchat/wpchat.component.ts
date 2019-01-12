import { Component, OnInit, Input, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ChatService, WPChatMessage } from 'src/app/services/chat.service';
import { WorkPackage } from 'src/app/services/workpackages.service';
import { AuthService } from 'src/app/services/auth.service';

import {Router, ActivatedRoute} from '@angular/router'
import { Subject } from 'rxjs';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling'
import { flatMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wpchat',
  templateUrl: './wpchat.component.html',
  styleUrls: ['./wpchat.component.scss']
})
export class WpchatComponent implements OnInit, OnDestroy {

  @Input() type: string; //peut être "workpackage","task", "general", ou "mission"
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  messages:Array<WPChatMessage> = [];
  message:string = '';
  ready:boolean;
  elementid:string; // l'id du workpackage, de la tache...




  constructor(private cdRef: ChangeDetectorRef,private chatService: ChatService, private auth: AuthService, private route:ActivatedRoute, private router: Router, private userService:UserService) {


   

    
   }

  ngOnInit() {


  
    this.route.params.subscribe(
      params => {
        
        this.chatService.removeListener(); // c'est du bidouillage mais ça marche!
        this.elementid = params.id; // on récupère l'id du nouveau wp
        if(this.type == 'workpackage'){

          this.chatService.joinRoom(this.elementid); // on rejoint la chambre du nouveau wp  
          
          this.chatService.getChat(this.elementid).subscribe((res:any) => {
            this.messages = res
            this.ready = true;
            setTimeout(()=>this.adjustScrollSize(),200);
          }, (error) => console.log(error));
        }

        else if (this.type == 'task'){

          this.chatService.joinTaskRoom(this.elementid);  
          this.chatService.getTaskChat(this.elementid).subscribe((res:any) => {
            this.messages = res;
            this.ready = true;
            this.viewport.scrollToIndex(0)
          }, (error) => console.log(error));

        }



        /*
        this.chatService.newMessage().pipe(
          flatMap((data:any) => this.userService.getUser(data.user)),
        ).subscribe((res:any) => {
          console.log(res);
        });*/

        
        this.chatService.newMessage().subscribe((data:any) => {


          
          this.messages = [...this.messages, data];
          this.cdRef.detectChanges();
          setTimeout(()=>this.adjustScrollSize(),200);

          console.log(this.messages)
          
          
        }
          , (error) => console.log(error));
      });


    


  }

  adjustScrollSize = function(){

    document.getElementById("chat-container").scrollTop = document.getElementById("chat-container").scrollHeight;

  }

  ngOnDestroy(){

    if (this.type == 'workpackage'){

      this.chatService.leaveRoom(this.elementid);

    }

    else if (this.type == 'task') {

      this.chatService.leaveTaskRoom(this.elementid);

    }
   

  }

  isSameDay(date1:Date,date2:Date):boolean{

    let date11 = new Date(date1);
    let date22 = new Date(date2);

    if (date11.toLocaleDateString() == date22.toLocaleDateString()){

      return true;

    }

    return false;


  }

  hour(date:Date){

    let mydate = new Date(date)
    const options_time = { hour:"2-digit", minute:"2-digit"}

    return mydate.toLocaleTimeString('fr-FR',options_time)


  }

  more1hour(date1:Date, date2:Date):boolean{

    let date11 = new Date(date1)
    let date22 = new Date(date2)

    if ((Math.abs(date11.getTime() - date22.getTime()) / 36e5 > 1) && this.isSameDay(date1,date2)) {

      return true;

    }

    else {
      return false;
    }

  }

  date(date:Date){


    let mydate = new Date(date)
    const options = {month: 'long', day: 'numeric' };

    return mydate.toLocaleDateString('fr-FR', options);

  }


  submit(event) {

   
    if(event.keyCode == 13 && event.target.value.length> 0) {
      //càd si l'utilisateur appuie sur entrée, on soumet le message


      console.log(this.type)

      if (this.type == 'workpackage') {



        this.chatService.saveMessage({content:event.target.value, date:Date.now(), wp:this.elementid, user:this.auth.getPayload()._id}).subscribe();
        this.chatService.sendMessage(event.target.value, this.elementid);

      }

      else if (this.type == 'task'){

        this.chatService.saveTaskMessage({content:event.target.value, date:Date.now(), task:this.elementid, user:this.auth.getPayload()._id}).subscribe();
        this.chatService.sendTaskMessage(event.target.value, this.elementid);

      }
      


      this.clearMessage();
      
    }

  }

  clearMessage(){
    if (this.message ==''){
      this.message = null;
    }
    else if (this.message==null){
      this.message = '';
    }

    //il s'agit d'une douille pour faire un vrai changement que Angular détecte.
  }

  isSocketMsg(msg): boolean{

    return !msg.hasOwnProperty('_id');

  }


}
