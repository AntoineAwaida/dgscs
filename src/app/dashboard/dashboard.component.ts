import { Component, OnInit } from '@angular/core';
import { AnnouncesService, Announce } from '../services/announces.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  announce:Announce;

  constructor(private announceService: AnnouncesService) { }

  ngOnInit() {

    this.announceService.getLastAnnounce().subscribe((res:any)=> this.announce = res, (error)=> console.log(error))

  }

}
