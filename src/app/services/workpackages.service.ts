import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs'

import { api, server } from '../constants';


export interface WorkPackage {

  name:string,
  description:string,
  tasks: Array<string>,
  status: string,
  groups: Array<any>,
  _id?:string

}

@Injectable({
  providedIn: 'root'
})
export class WorkpackagesService {

  constructor(private httpClient: HttpClient) { }

  public createWorkPackage(wp: WorkPackage): Observable<Object> {
    return this.httpClient.post(api + "workpackages/createwp",wp)
  }

  public editWorkPackage(wp: WorkPackage, wpid:string): Observable<Object> {
    return this.httpClient.put(api + "workpackages/editwp/" + wpid, wp)
  }


  public getWorkPackages(): Observable<Object> {
    return this.httpClient.get(api + "workpackages/getwp");
  }

  public getWorkPackage(id:string): Observable<Object> {
    return this.httpClient.get(api + "workpackages/getwp/" +id);
  }


  public activate(id:string): Observable<Object> {
    return this.httpClient.get(api + "workpackages/activate/" + id)
  }

  public deactivate(id:string): Observable<Object> {
    return this.httpClient.get(api + "workpackages/deactivate/" + id)
  }

  public readonly(id:string): Observable<Object> {
    return this.httpClient.get(api + "workpackages/readonly/" + id)
  }


  public addFile(data, wpid:string): Observable<Object> {
    return this.httpClient.post(api + "workpackages/savefile/" + wpid,data)
  }

  public getFiles(wpid:string): Observable<Object> {
    return this.httpClient.get(api + "workpackages/getfiles/" + wpid);
  }


}
