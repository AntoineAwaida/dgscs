import { Component, OnInit, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { WorkPackage, WorkpackagesService } from 'src/app/services/workpackages.service';

import { MatDialog } from '@angular/material';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';


@Component({
  selector: 'app-wptask',
  templateUrl: './wptask.component.html',
  styleUrls: ['./wptask.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WptaskComponent implements OnInit {

  @Input() workpackage: WorkPackage;

  constructor(public dialog: MatDialog, public workpackageService: WorkpackagesService) { }

  ngOnInit() {
  }

  openDialog(e):void {


    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: {id : e, tasks: this.workpackage.tasks, type:'workpackage'}
    })


    dialogRef.afterClosed().subscribe(result => {

      if (result){
        this.workpackage.tasks = this.workpackage.tasks.concat(result);
      }
      
    });

  }

  delete(taskid, wpid):void {

    const result = confirm("Voulez-vous vraiment détacher cette tâche du workpackage?")

    if(result){

      this.workpackageService.deleteLinkTask({task:taskid}, wpid).subscribe((res:any) => {

        this.workpackage.tasks = this.workpackage.tasks.filter( e => e._id != taskid
          );

      });

    }

  }

}
