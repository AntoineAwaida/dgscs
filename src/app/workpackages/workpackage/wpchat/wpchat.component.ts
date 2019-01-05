import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService, WPChatMessage } from 'src/app/services/chat.service';
import { WorkPackage } from 'src/app/services/workpackages.service';
import { AuthService } from 'src/app/services/auth.service';

import {Router, ActivatedRoute} from '@angular/router'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-wpchat',
  templateUrl: './wpchat.component.html',
  styleUrls: ['./wpchat.component.scss']
})
export class WpchatComponent implements OnInit, OnDestroy {


  @Input() type: string; //peut être "workpackage","task", "general", ou "mission"

  messages:Array<WPChatMessage> = [];
  message:string = '';
  ready:boolean;
  elementid:string; // l'id du workpackage, de la tache...




  constructor(private chatService: ChatService, private auth: AuthService, private route:ActivatedRoute, private router: Router) {


   

    
   }

  ngOnInit() {

  
    this.route.params.subscribe(
      params => {
        
        this.chatService.removeListener(); // c'est du bidouillage mais ça marche!
        this.elementid = params.id; // on récupère l'id du nouveau wp
        if(this.type == 'workpackage'){

          this.chatService.joinRoom(this.elementid); // on rejoint la chambre du nouveau wp  
          this.chatService.getChat(this.elementid).subscribe((res:any) => (this.messages = res) && (this.ready = true), (error) => console.log(error));

        }

        else if (this.type == 'task'){

          this.chatService.joinTaskRoom(this.elementid);  
          this.chatService.getTaskChat(this.elementid).subscribe((res:any) => (this.messages = res) && (this.ready = true), (error) => console.log(error));

        }



      
        this.chatService.newMessage().subscribe((data:any) => {
          
          this.messages.push(data)
          
        }
          , (error) => console.log(error));
      });

  
    


  }

  ngOnDestroy(){

    if (this.type == 'workpackage'){

      this.chatService.leaveRoom(this.elementid);

    }

    else if (this.type == 'task') {

      this.chatService.leaveTaskRoom(this.elementid);

    }
   

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

   
    if(event.keyCode == 13 && event.target.value.length> 0) {
      //càd si l'utilisateur appuie sur entrée, on soumet le message
      

      if (this.type =='workpackage') {

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

}
