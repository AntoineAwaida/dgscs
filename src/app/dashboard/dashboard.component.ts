import { Component, OnInit } from '@angular/core';
import { AnnouncesService, Announce } from '../services/announces.service';
import { WorkPackage } from '../services/workpackages.service';
import { Task } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ReportService } from '../services/report.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  announce:Announce;
  ready:boolean = false;

  reports: Array<any> = null

  //favs:Array<any> = [];
  favWorkPackages = [];
  favTasks = [];


  constructor(private announceService: AnnouncesService, private auth: AuthService, private userService: UserService, private reportService: ReportService) { }

  ngOnInit() {


    const obs1 =  this.announceService.getLastAnnounce();

    const obs2 = this.reportService.get3LastReports();

    const obs3 = this.userService.getMyFavs();

    const obs = forkJoin(obs1,obs2,obs3);

   obs.subscribe((res:any)=> {
     this.announce = res[0];
     this.reports = res[1];
     this.favWorkPackages=res[2].favWorkPackages;
     this.favTasks=res[2].favTasks;
     this.ready = true;

   }, (error)=> console.log(error))

    

   /*
    this.getFavs();
    this.getReports();

    */

  }

  instanceOfWorkpackage(object: any): object is WorkPackage {
    return 'tasks' in object; //marqueur d'un wp : un wp a des taches comme attribut, pas une tache ni une mission!
  }
  
  instanceOfTasks(object: any): object is Task {
    return 'endingDate' in object; //marqueur d'une tache: une tache a une date de fin comme attribut, pas un wp ni une mission!
  }
  
  instanceOfMission(object:any) {
  
    return false; //à compléter
  
  }

  date(date:Date){

    let mydate = new Date(date);
    const options = {month: 'long', day: 'numeric' };


    const options_time = { hour:"2-digit", minute:"2-digit"}

    return mydate.toLocaleDateString('fr-FR', options) + " à " + mydate.toLocaleTimeString('fr-FR',options_time)

  }

}
