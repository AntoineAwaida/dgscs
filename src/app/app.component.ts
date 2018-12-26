import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TitleService } from './services/title.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  sidenavOpened = false;

  constructor(public auth : AuthService, private route : ActivatedRoute  ,private titleService : TitleService){}
  
  ngOnInit(){
  }

  toogleSidenav() {
    this.sidenavOpened = !this.sidenavOpened
  }

  logout(){
    this.sidenavOpened=false;
    this.auth.logout();
  }
}

