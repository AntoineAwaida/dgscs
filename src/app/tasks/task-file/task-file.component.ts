
import { Component, OnInit } from '@angular/core';
//import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
//import { saveAs } from 'file-saver';


@Component({
  selector: 'app-task-file',
  templateUrl: './task-file.component.html',
  styleUrls: ['./task-file.component.scss']
})
export class TaskFileComponent implements OnInit {

  //uri = 'http://localhost:3000/file/upload';
  //uploader:FileUploader = new FileUploader({url:this.uri});
  attachmentList:any = [];

  constructor() { }

  ngOnInit() {
  }

}