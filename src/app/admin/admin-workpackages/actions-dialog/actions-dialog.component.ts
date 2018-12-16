import { Component, OnInit, Inject, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { WorkpackagesService } from '../../../services/workpackages.service';


import {EventEmitter} from '@angular/core'

export interface DialogData {
  id:string,
  status:string,
}



@Component({
  selector: 'app-actions-dialog',
  templateUrl: './actions-dialog.component.html',
  styleUrls: ['./actions-dialog.component.scss']
})
export class ActionsDialogComponent implements OnInit {

  @Output() onEditRequest: EventEmitter<any> = new EventEmitter<any>();

  msg:string;

  constructor(public dialogRef: MatDialogRef<ActionsDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private workpackageService: WorkpackagesService) { }

  ngOnInit() {
  }


  onNoClick(): void {
    this.dialogRef.close(this.msg);
  }

  activate(id){
    this.workpackageService.activate(id).subscribe((res:any)=> {
      this.msg = res;
      this.onNoClick();
    },
    (error => {
      //this.error = error;
      console.log(error);
    }))
  }

  deactivate(id){
    this.workpackageService.deactivate(id).subscribe((res:any)=> {
      this.msg = res;
      this.onNoClick();
    },
    (error => {
      //this.error = error;
      console.log(error);
    }))
  }

  readonly(id){
    this.workpackageService.readonly(id).subscribe((res:any)=> {
      this.msg = res;
      this.onNoClick();
    },
    (error => {
      //this.error = error;
      console.log(error);
    }))
  }

  edit(id){

    this.onEditRequest.emit(id)
    this.onNoClick();

  }


}
