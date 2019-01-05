import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import {api} from '../constants'




export interface Announce {

  title:string,
  author:any,
  content:any,
  date?:Date,
  _id?:string

}

@Injectable({
  providedIn: 'root'
})

export class AnnouncesService {

  constructor(private httpClient: HttpClient) { }


  public getAnnounces(): Observable<Object>{

    return this.httpClient.get(api+"announces/getannounces");

  }

  public deleteAnnounce(id:string): Observable<Object>{

    return this.httpClient.delete(api+"announces/deleteannounce/" + id)

  }

  public getAnnounce(id:string) : Observable<Object>{

    return this.httpClient.get(api+"announces/getannounce/"+id);

  }

  public createAnnounce(announce:Announce): Observable<Object>{

    return this.httpClient.post(api+"announces/createannounce", announce)

  }


  public editAnnounce(announce:Announce,id:string): Observable<Object>{

    return this.httpClient.put(api + "announces/editannounce/" + id, announce);

  }

  public getLastAnnounce(): Observable<Object>{

    return this.httpClient.get(api + "announces/getlastannounce");

  }

}
