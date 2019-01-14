import { Component, OnInit, ViewChild, Inject } from '@angular/core';


import { MatTableDataSource, MatPaginator, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material'
import { WorkpackagesService } from 'src/app/services/workpackages.service';

import {ActionsDialogComponent} from './actions-dialog/actions-dialog.component'


@Component({
  selector: 'app-admin-workpackages',
  templateUrl: './admin-workpackages.component.html',
  styleUrls: ['./admin-workpackages.component.scss']
})
export class AdminWorkpackagesComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;


  wp_to_edit:string;
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

  constructor(private workpackageService: WorkpackagesService, public dialog: MatDialog) { }

  openDialog(e):void {

    const dialogRef = this.dialog.open(ActionsDialogComponent, {
      data: {id : e._id, status: e.status }
    })

    const sub = dialogRef.componentInstance.onEditRequest.subscribe((res:any) => {
      this.toggleEditForm(res);
    })

    dialogRef.afterClosed().subscribe(result => {
      sub.unsubscribe();
      this.getWorkPackages();
      this.msg = result;
      setTimeout(() => {this.msg = null}, 4000);
    });

  }


  ngOnInit() {
    this.getWorkPackages();
  }

  getWorkPackages(){

    this.workpackageService.getWorkPackages().subscribe((res:any)=> {
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
    this.wp_to_edit = null;
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  toggleEditForm(wpid){
    this.showAddForm = !this.showAddForm
    this.showTable = !this.showTable
    this.wp_to_edit = wpid
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  onSubmitted(msg){
    this.toggleAddForm()
    this.msg = msg;
    setTimeout(() => {this.msg = null}, 4000);
    this.getWorkPackages()
  }


}
