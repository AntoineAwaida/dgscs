import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AnnouncesService, Announce } from '../services/announces.service';

@Component({
  selector: 'app-announces',
  templateUrl: './announces.component.html',
  styleUrls: ['./announces.component.scss']
})
export class AnnouncesComponent implements OnInit {


  announces:Array<any> = [];

  ready:boolean = false;

  showAnnounce:boolean = false;

  show_announce:Announce;

  constructor(private announceService: AnnouncesService) { }

  ngOnInit() {

    this.getAnnounces();

  }

    

  @ViewChild(MatPaginator) paginator: MatPaginator;



  displayedColumns: string [] = ['title','date','author', 'actions']

  dataSource = new MatTableDataSource(this.announces);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 
  getAnnounces(){

    this.announceService.getAnnounces().subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
      console.log(res)
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.ready = true;
    }, (error:any)=>console.log(error));

  }

  date(date:Date){

    let mydate = new Date(date);
    const options = {month: 'long', day: 'numeric' };


    const options_time = { hour:"2-digit", minute:"2-digit"}

    return mydate.toLocaleDateString('fr-FR', options) + ", " + mydate.toLocaleTimeString('fr-FR',options_time)

  }

  show(element){

    this.show_announce = element;
    this.showAnnounce = true;

  }

  unshow(){
    this.show_announce = null;
    this.showAnnounce = false;
  }



}
