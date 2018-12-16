import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs'

import {api} from '../constants'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }



public getUsers(): Observable<Object> {
  return this.httpClient.get("http://localhost:3000/api/users/getusers")
}

public getActiveUsers(): Observable<Object> {
  return this.httpClient.get("http://localhost:3000/api/users/getactiveusers")
}

public getUser(userid): Observable<Object> {
  return this.httpClient.get("http://localhost:3000/api/users/getuser/" + userid)
}

public getPendingUsers(): Observable<Object> {
  return this.httpClient.get("http://localhost:3000/api/users/getpendingusers")
}

public deactivateUser(userid): Observable<Object> {
  return this.httpClient.get("http://localhost:3000/api/users/deactivateuser/" + userid)
}

public activateUser(userid): Observable<Object> {
  return this.httpClient.get("http://localhost:3000/api/users/activateuser/" + userid)
}

public getGroups(userid: string) : Observable<Object> {
  return this.httpClient.get(api + "users/mygroups/" + userid)
}

public getWorkPackages(userid: string): Observable<Object> {
  return this.httpClient.get(api + "users/mywp/" + userid)
}

public setPicture(data, userid:string): Observable<Object> {

  return this.httpClient.post(api + "users/setpicture/" + userid, data);
}


}