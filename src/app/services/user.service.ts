import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs'

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

public deactivateUser(userid): Observable<Object> {
  return this.httpClient.get("http://localhost:3000/api/users/deactivateuser/" + userid)
}

public activateUser(userid): Observable<Object> {
  return this.httpClient.get("http://localhost:3000/api/users/activateuser/" + userid)
}


}