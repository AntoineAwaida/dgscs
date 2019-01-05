import { Injectable } from '@angular/core';

import {Observable} from 'rxjs'

import * as io from 'socket.io-client'
import { AuthService } from './auth.service';

import { HttpClient } from '@angular/common/http'

import { api, server } from '../constants';


export interface WPChatMessage {

  
  content:string,
  date:number,
  user:string,
  wp:string


}

export interface TaskChatMessage {

  
  content:string,
  date:number,
  user:string,
  task:string


}



@Injectable({
  providedIn: 'root'
})





export class ChatService {

  constructor(private auth: AuthService, private httpClient: HttpClient) { }

  public wpsocket = io(server + '/workpackage');
  
  public tasksocket = io(server + '/task');

  sendTaskMessage(msg:string, taskid:string) {
    this.wpsocket.
    emit('SEND_MESSAGE', {
        room : "task" + taskid,

        data:   {
          
        user: this.auth.getPayload()._id,
        content: msg,
        date: Date.now(),
        task: taskid

        }
    })
  }

  sendMessage(msg:string, wpid:string) {
    this.wpsocket.
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


  removeListener(){

    this.wpsocket.off('RECEIVE_MESSAGE')

  }

  removeTaskListener(){

    this.tasksocket.off('RECEIVE_MESSAGE')

  }



  saveMessage(msg:WPChatMessage):Observable<Object>{

    return this.httpClient.post(api + "workpackages/savechat",msg);

  }

  saveTaskMessage(msg:TaskChatMessage):Observable<Object>{

    return this.httpClient.post(api + "tasks/savechat",msg);

  }


  newMessage():Observable<WPChatMessage> {

      return new Observable<WPChatMessage> (observer => {
        
        this.wpsocket.on('RECEIVE_MESSAGE', function(data){
          
          observer.next(data);

        });
      })

  }

  newTaskMessage():Observable<WPChatMessage> {

    return new Observable<WPChatMessage> (observer => {
      
      this.tasksocket.on('RECEIVE_MESSAGE', function(data){
        
        observer.next(data);

      });
    })

}

  joinRoom(wpid:string){

    this.wpsocket.emit('JOIN_ROOM', { room: "workpackage" + wpid})

  }

  joinTaskRoom(taskid:string){

    this.wpsocket.emit('JOIN_ROOM', { room: "task" + taskid})

  }

  leaveRoom(wpid:string) {


    this.wpsocket.emit('LEAVE_ROOM', { room: "workpackage" + wpid})

  }

  leaveTaskRoom(taskid:string) {


    this.wpsocket.emit('LEAVE_ROOM', { room: "workpackage" + taskid})

  }


  getChat(wpid:string):Observable<Object>{

    return this.httpClient.get(api + "workpackages/getchat/" + wpid)
    
  }

  getTaskChat(taskid:string):Observable<Object>{

    return this.httpClient.get(api + "tasks/getchat/" + taskid)
    
  }


}
