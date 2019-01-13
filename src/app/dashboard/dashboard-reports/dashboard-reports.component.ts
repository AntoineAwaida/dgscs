import { Component, OnInit, Input } from '@angular/core';
import { server } from 'src/app/constants';

@Component({
  selector: 'app-dashboard-reports',
  templateUrl: './dashboard-reports.component.html',
  styleUrls: ['./dashboard-reports.component.scss']
})
export class DashboardReportsComponent implements OnInit {


  @Input() files;

  constructor() { }

  ngOnInit() {
  }

  getFile(file){
    return server+'/api/files/'+file.fileURL
  }

}
