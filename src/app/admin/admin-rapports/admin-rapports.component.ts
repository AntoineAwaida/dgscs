import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-rapports',
  templateUrl: './admin-rapports.component.html',
  styleUrls: ['./admin-rapports.component.scss']
})
export class AdminRapportsComponent implements OnInit {

  showAddForm:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleAddForm(){
    this.showAddForm = !this.showAddForm
  }

}
