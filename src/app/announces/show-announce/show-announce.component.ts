import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { Announce } from 'src/app/services/announces.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-show-announce',
  templateUrl: './show-announce.component.html',
  styleUrls: ['./show-announce.component.scss']
})
export class ShowAnnounceComponent implements OnInit {


  @Input() announce: Announce;

  constructor(private sanitize: DomSanitizer) { }

  ngOnInit() {
  }

  date(date:Date){

    let mydate = new Date(date);
    const options = {month: 'long', day: 'numeric' };


    const options_time = { hour:"2-digit", minute:"2-digit"}

    return mydate.toLocaleDateString('fr-FR', options) + " à " + mydate.toLocaleTimeString('fr-FR',options_time)

  }

  sanitizetext(text){

    return this.sanitize.sanitize(SecurityContext.HTML,text);


  }

}
