import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { server } from '../../constants';

@Component({
  selector: 'app-task-file-list',
  templateUrl: './task-file-list.component.html',
  styleUrls: ['./task-file-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskFileListComponent implements OnInit {

  @Input() files:Array<any>;

  constructor() { }

  ngOnInit() {
  }

  getFile(file){
    return server+'/api/files/'+file._id
  }

}
