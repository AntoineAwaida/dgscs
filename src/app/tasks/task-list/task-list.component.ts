import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
  import { AuthService } from 'src/app/services/auth.service';
import { forkJoin } from 'rxjs';
import { MatSort, MatTableDataSource, MatPaginator, MatSortable } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  dataSource_active = new MatTableDataSource();
  dataSource_finished = new MatTableDataSource();

  applyFilterActive(filterValue: string) {
    this.dataSource_active.filter = filterValue.trim().toLowerCase();
  }

  applyFilterFinished(filterValue: string) {
    this.dataSource_finished.filter = filterValue.trim().toLowerCase();
  }

  loader = true;

  constructor(private auth : AuthService, private taskService : TaskService, private router: Router) { }

  
  displayedColumns: string [] = ['name','endingDate', 'status']

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {

    const obs1 = this.taskService.getMyActiveTasks();
    const obs2 = this.taskService.getMyFinsihedTasks();
    forkJoin(obs1,obs2)
    .subscribe(
      (res) =>{
        this.dataSource_active = new MatTableDataSource(res[0]);
        this.dataSource_finished = new MatTableDataSource(res[1]);
        setTimeout(() => {
          this.sort.sort(<MatSortable>{
            id: 'endingDate',
            start: 'asc'
            }
          );
          this.dataSource_active.sort = this.sort
          this.dataSource_finished.sort = this.sort;
          this.dataSource_active.sortingDataAccessor = (item:any, property) => {
            switch (property) {
              case 'endingDate': return new Date(item.endingDate);
              default: return item[property];
            }
          }; 
          this.dataSource_finished.sortingDataAccessor = (item:any, property) => {
            switch (property) {
              case 'endingDate': return new Date(item.endingDate);
              default: return item[property];
            }
          }; 
        });
        this.loader = false;
      }
    )
  } 

  getStatus(status) {
    let printStatus = "";
    switch(status){
      case "pending":
        printStatus = "En attente";
        break;
      case "ongoing":
        printStatus = "En cours";
        break; 
      case "done":
        printStatus = "Terminée";
        break;
      default :
        printStatus = "En attente";
    }
    return printStatus;
  }

  isAuthor(task){
    return task.author == this.auth.getPayload()._id;
  }

  date(date:Date){

    let mydate = new Date(date);
    const options = {month: 'long', day: 'numeric', year:'numeric' };

    return mydate.toLocaleDateString('fr-FR', options);

  }

  navigate(row){
    this.router.navigate(['/tasks/details/', row._id])
  }


}
