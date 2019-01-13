import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { api } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) { }

  public get3LastReports(): Observable<Object>{

    return this.httpClient.get(api+"reports/get3lastreports");

  }
  
}
