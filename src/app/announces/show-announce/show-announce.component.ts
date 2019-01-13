import { Component, OnInit, Input } from '@angular/core';
import { Announce } from 'src/app/services/announces.service';

@Component({
  selector: 'app-show-announce',
  templateUrl: './show-announce.component.html',
  styleUrls: ['./show-announce.component.scss']
})
export class ShowAnnounceComponent implements OnInit {


  @Input() announce: Announce;

  constructor() { }

  ngOnInit() {
  }

  date(date:Date){

    let mydate = new Date(date);
    const options = {month: 'long', day: 'numeric' };


    const options_time = { hour:"2-digit", minute:"2-digit"}

    return mydate.toLocaleDateString('fr-FR', options) + " à " + mydate.toLocaleTimeString('fr-FR',options_time)

  }

}
