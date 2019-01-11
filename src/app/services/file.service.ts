import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { api, server } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private auth : AuthService, private httpClient: HttpClient, private router: Router) { }
  
  getMyFiles(): Observable<any> {
    return this.httpClient.get(api+"users/myfiles");

  }

}
