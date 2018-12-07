import { Component, OnInit, ViewChild } from '@angular/core';


import { MatTableDataSource, MatPaginator } from '@angular/material'
import { WorkpackagesService } from 'src/app/services/workpackages.service';

@Component({
  selector: 'app-admin-workpackages',
  templateUrl: './admin-workpackages.component.html',
  styleUrls: ['./admin-workpackages.component.scss']
})
export class AdminWorkpackagesComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;

  msg:string;
  showAddForm:boolean = false;
  showTable:boolean = true;
  error:string;

  ready:boolean = false;

  displayedColumns: string [] = ['name','groups', 'status', 'actions']

  dataSource = new MatTableDataSource();
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private workpackageService: WorkpackagesService) { }

  ngOnInit() {
    this.getWorkPackages();
  }

  getWorkPackages(){

    this.workpackageService.getWorkPackages().subscribe((res:any)=> {
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.ready = true;
    }, (error) => {
      this.error = error;
      console.log(error);
    })

  }

  toggleAddForm(){
    this.showAddForm = !this.showAddForm
    this.showTable = !this.showTable
  }

  onSubmitted(msg){
    this.toggleAddForm()
    this.msg = msg;
    setTimeout(() => {this.msg = null}, 4000);
    this.getWorkPackages()
  }

  activate(id){
    this.workpackageService.activate(id).subscribe((res:any)=> {
      this.msg = res;
      setTimeout(() => {this.msg = null}, 4000);
      this.getWorkPackages();
    },
    (error => {
      this.error = error;
      console.log(error);
    }))
  }

  deactivate(id){
    this.workpackageService.deactivate(id).subscribe((res:any)=> {
      this.msg = res;
      setTimeout(() => {this.msg = null}, 4000);
      this.getWorkPackages();
    },
    (error => {
      this.error = error;
      console.log(error);
    }))
  }

  readonly(id){
    this.workpackageService.readonly(id).subscribe((res:any)=> {
      this.msg = res;
      setTimeout(() => {this.msg = null}, 4000);
      this.getWorkPackages();
    },
    (error => {
      this.error = error;
      console.log(error);
    }))
  }


}
