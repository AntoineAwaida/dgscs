import { Component, OnInit, ViewChild } from '@angular/core';


import { MatTableDataSource, MatPaginator } from '@angular/material'
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ready:boolean = false;
  msg:string;
  error:string;

  constructor(private userService : UserService) { }


  displayedColumns: string [] = ['first_name','last_name', 'actions']

  dataSource = new MatTableDataSource();
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  

  async ngOnInit() {
    await this.getUsers();
  }

  
  async getUsers(){

    this.userService.getUsers().subscribe((res:any) => {
      this.dataSource = new MatTableDataSource(res);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.ready = true;
    },
    (error)=> {
      console.log(error)
    })


  }

  deactivate(id){
    const result = confirm("Voulez-vous vraiment désactiver cet utilisateur?")
    if(result) {
      this.userService.deactivateUser(id).subscribe((res:any) => {
        this.getUsers()
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
        this.getUsers()
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
