import { Component, OnInit, ViewChild } from '@angular/core';


import { MatTableDataSource, MatPaginator } from '@angular/material'

import {Router} from '@angular/router'
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-pending-users',
  templateUrl: './pending-users.component.html',
  styleUrls: ['./pending-users.component.scss']
})
export class PendingUsersComponent implements OnInit {

  displayedColumns: string [] = ['first_name','last_name', 'actions']

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ready:boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  constructor(private router:Router, private userService: UserService) { }

  ngOnInit() {
    this.getPendingUsers();
  }


  getPendingUsers(){
    this.userService.getPendingUsers().subscribe((res:any)=> {
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.ready = true;

    }, 
  (error)=> {
    console.log(error)
  })
  }

}

