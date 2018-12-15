import { Injectable } from '@angular/core';
import {server} from '../constants'

import {Observable} from 'rxjs'

import * as io from 'socket.io-client'
import { AuthService } from './auth.service';

import { HttpClient } from '@angular/common/http'

import {api} from '../constants'


export interface WPChatMessage {

  
  content:string,
  date:number,
  user:string,
  wp:string


}



@Injectable({
  providedIn: 'root'
})





export class ChatService {

  constructor(private auth: AuthService, private httpClient: HttpClient) { }

  public socket = io(server + '/workpackage');
  

  sendMessage(msg:string, wpid:string) {
    this.socket.
    emit('SEND_MESSAGE', {
        room : "workpackage" + wpid,

        data:   {
          
        user: this.auth.getPayload()._id,
        content: msg,
        date: Date.now(),
        wp: wpid

        }
    })
  }


  saveMessage(msg:WPChatMessage):Observable<Object>{

    return this.httpClient.post(api + "workpackages/savechat",msg);

  }


  newMessage():Observable<WPChatMessage> {

      return new Observable<WPChatMessage> (observer => {
        
        this.socket.on('RECEIVE_MESSAGE', function(data){
          observer.next(data);
        });
      })

  }

  joinRoom(wpid:string){

    this.socket.emit('JOIN_ROOM', { room: "workpackage" + wpid})

  }

  leaveRoom(wpid:string) {


    this.socket.emit('LEAVE_ROOM', { room: "workpackage" + wpid})

  }

  getChat(wpid:string):Observable<Object>{

    return this.httpClient.get(api + "workpackages/getchat/" + wpid)
    
  }


}
