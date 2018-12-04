import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs'




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
    return this.httpClient.post("http://localhost:3000/api/groups/creategroup",group)
  }

  public getGroups(): Observable<Object>{
    return this.httpClient.get("http://localhost:3000/api/groups/getgroups")
  }

  public deleteGroup(groupid: string): Observable<Object>{
    return this.httpClient.delete("http://localhost:3000/api/groups/deletegroup/"+groupid)
  }
}
