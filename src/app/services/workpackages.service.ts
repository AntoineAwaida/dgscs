import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs'

import {api} from '../constants'


export interface WorkPackage {

  name:string,
  description:string,
  tasks: Array<string>,
  status: string,
  groups: Array<any>

}

@Injectable({
  providedIn: 'root'
})
export class WorkpackagesService {

  constructor(private httpClient: HttpClient) { }

  public createWorkPackage(wp: WorkPackage): Observable<Object> {
    return this.httpClient.post(api + "workpackages/createwp",wp)
  }


  public getWorkPackages(): Observable<Object> {
    return this.httpClient.get(api + "workpackages/getwp");
  }

}
