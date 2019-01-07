
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/services/auth.service';
//import { saveAs } from 'file-saver';


@Component({
  selector: 'app-task-file',
  templateUrl: './task-file.component.html',
  styleUrls: ['./task-file.component.scss']
})


export class TaskFileComponent implements OnInit, OnChanges {

  @Input() type: string; //"workpackages","tasks"
  @Input() parentID: string; //l'id de task, wp, etc. parent

  @Output() newFile = new EventEmitter<any>();

  uri : string;
  uploader : FileUploader;

  attachmentList:any = [];

  constructor(private auth : AuthService) {
      this.uploader = new FileUploader({
        authTokenHeader: "Authorization",
        authToken : `Bearer ${this.auth.getToken()}`
        })
   } 

  ngOnChanges(){
    this.uri = 'http://cs3.cs-campus.fr:3000/api/'+this.type+'/file/'+this.parentID;
    this.uploader.options.url = this.uri;
    console.log("changes : " + this.uri)
  }

  ngOnInit() {

    this.uri = 'http://cs3.cs-campus.fr:3000/api/'+this.type+'/file/'+this.parentID;
    this.uploader.options.url = this.uri;
    console.log("init : " + this.uri)
    
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("author", this.auth.getPayload()._id); // Pas incroyable, il faudrait que l'auteur soit extrait du token par le header :(
    };

    this.uploader.onCompleteItem = (item, response, status, headers) => {
      this.attachmentList.push(JSON.parse(response));
      console.log(JSON.parse(response));
      this.newFile.emit(JSON.parse(response).file);

      //console.log(item);
      console.log(this.attachmentList);
      
    }

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }

}
