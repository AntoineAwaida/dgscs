import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.scss']
})
export class AdminGroupsComponent implements OnInit {

  showAddForm: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleAddForm(){
    this.showAddForm = !this.showAddForm
  }

}
