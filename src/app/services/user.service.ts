import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs'

import { api, server } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }



public getUsers(): Observable<Object> {
  return this.httpClient.get(api+"users/getusers")
}

public getActiveUsers(): Observable<Object> {
  return this.httpClient.get(api+"users/getactiveusers")
}

public getUser(userid): Observable<Object> {
  return this.httpClient.get(api+"users/getuser/" + userid)
}

// public getFavsUser(userid:string): Observable<Object> {
//   return this.httpClient.get(api + "users/getfavs/" + userid);
// }

public getMyFavs(): Observable<Object> {
  return this.httpClient.get(api + "users/myfavs");
}

public getPendingUsers(): Observable<Object> {
  return this.httpClient.get(api+"users/getpendingusers")
}

public deactivateUser(userid): Observable<Object> {
  return this.httpClient.put(api+"users/desactivateuser", null);
}

public activateUser(userid): Observable<Object> {
  return this.httpClient.put(api+"users/activateuser/", null);
}

// public getGroups(userid: string) : Observable<Object> {
//   return this.httpClient.get(api + "users/mygroups/" + userid)
// }

// public getWorkPackages(userid: string): Observable<Object> {
//   return this.httpClient.get(api + "users/mywp/" + userid)
// }

public getMyWorkPackages(): Observable<Object> {
  return this.httpClient.get(api + "users/myworkpackages");
}

public setPicture(data, userid:string): Observable<Object> {

  return this.httpClient.post(api + "users/setpicture/" + userid, data);
}

public editmypassword(data): Observable<Object> {

  return this.httpClient.put(api + "users/editmypassword/", data);

}

public editMyFavs(data): Observable<Object> {

  return this.httpClient.put(api + "users/editmyfavs/", data);

}



}