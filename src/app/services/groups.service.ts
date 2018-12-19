import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs'
import { api, server } from '../constants';




export interface Group {

  name:string;
  members:Array<any>;

}

@Injectable({
    providedIn: 'root'
})


export class GroupsService {

  constructor(private httpClient: HttpClient) { }


  public createGroup(group: Group): Observable<Object>{
    return this.httpClient.post(api+"groups/creategroup",group)
  }

  public getGroups(): Observable<Object>{
    return this.httpClient.get(api+"groups/getgroups")
  }

  public getGroup(groupid:string): Observable<Object>{
    return this.httpClient.get(api+"groups/getgroup/"+ groupid)
  }

  public editGroup(group:Group, groupid:string): Observable<Object>{
    return this.httpClient.put(api+"groups/editgroup/"+ groupid, group)
  }

  public deleteGroup(groupid: string): Observable<Object>{
    return this.httpClient.delete(api+"groups/deletegroup/"+groupid)
  }
}
