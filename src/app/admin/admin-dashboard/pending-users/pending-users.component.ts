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
  msg:string;
  error:string;


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
    this.error = error;
  })
  }

  deactivate(id){
    const result = confirm("Voulez-vous vraiment désactiver cet utilisateur?")
    if(result) {
      this.userService.deactivateUser(id).subscribe((res:any) => {
        this.getPendingUsers()
        this.msg = res;
        setTimeout(() => {this.msg=null}, 4000)
       },
       (error)=> {
         this.error = error;
         setTimeout(() => {this.error=null}, 4000)
       })
    }
  }

  activate(id){
    const result = confirm("Voulez-vous vraiment activer cet utilisateur?")
    if(result) {
      this.userService.activateUser(id).subscribe((res:any) => {
        this.getPendingUsers()
        this.msg = res;
        setTimeout(() => {this.msg=null}, 4000)
       },
       (error)=> {
         this.error = error;
         setTimeout(() => {this.error=null}, 4000)
       })
    }
  }

}

