import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';


import { MatTableDataSource, MatPaginator } from '@angular/material'

import {Router} from '@angular/router'
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  

  constructor(private router:Router) { }

  ngOnInit(){
    
  }

  isActive(route){
    return this.router.url == route;
  }

}
