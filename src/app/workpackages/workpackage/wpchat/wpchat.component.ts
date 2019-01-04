import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService, WPChatMessage } from 'src/app/services/chat.service';
import { WorkPackage } from 'src/app/services/workpackages.service';
import { AuthService } from 'src/app/services/auth.service';

import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-wpchat',
  templateUrl: './wpchat.component.html',
  styleUrls: ['./wpchat.component.scss']
})
export class WpchatComponent implements OnInit, OnDestroy {

  messages:Array<WPChatMessage> = [];
  message:string;
  ready:boolean;
  wp:string;



  constructor(private chatService: ChatService, private auth: AuthService, private route:ActivatedRoute, private router: Router) {


   

    
   }

  ngOnInit() {

  
    this.route.params.subscribe(
      params => {

        this.wp = params.id;
        this.chatService.joinRoom(this.wp);
        this.chatService.getChat(this.wp).subscribe((res:any) => (this.messages = res) && (this.ready = true) && (console.log(this.messages)), (error) => console.log(error));
        this.chatService.newMessage().subscribe((data:any) => this.messages.push(data), (error) => console.log(error));
      });
    


  }

  ngOnDestroy(){

    this.chatService.leaveRoom(this.wp);

  }

  date(date:Date){


    let mydate = new Date(date)
    const options = {month: 'long', day: 'numeric' };
    const options_time = { hour:"2-digit", minute:"2-digit"}
    let final_date = ''
    if (mydate.toLocaleDateString() == new Date().toLocaleDateString()){

      final_date = mydate.toLocaleTimeString('fr-FR',options_time)

    }

    else {

      final_date = mydate.toLocaleDateString('fr-FR', options)

    }
    


    return final_date;

  }


  submit(event) {
    if(event.keyCode == 13) {
      //càd si l'utilisateur appuie sur entrée, on soumet le message
      

      this.chatService.saveMessage({content:this.message, date:Date.now(), wp:this.wp, user:this.auth.getPayload()._id}).subscribe((res:any)=> console.log(res));
      this.chatService.sendMessage(this.message, this.wp);
     

      this.message = ''
      
    }
  }

}
