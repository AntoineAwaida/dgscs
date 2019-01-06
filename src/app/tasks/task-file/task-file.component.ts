
import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/services/auth.service';
//import { saveAs } from 'file-saver';


@Component({
  selector: 'app-task-file',
  templateUrl: './task-file.component.html',
  styleUrls: ['./task-file.component.scss']
})
export class TaskFileComponent implements OnInit {

  uri = 'http://cs3.cs-campus.fr:3000/api/tasks/file/';
  uploader : FileUploader;

  attachmentList:any = [];

  constructor(private auth : AuthService) {
      this.uploader = new FileUploader({
        url: this.uri,
        authTokenHeader: "Authorization",
        authToken : `Bearer ${this.auth.getToken()}`
        })
   }

  ngOnInit() {

    this.uploader.onBuildItemForm = (item, form) => {
      form.append("author", "5c22f937a4d8dbbdf6aa4133"); // Pas incroyable, il faudrait que l'auteur soit extrait du token... :(
    };

    this.uploader.onCompleteItem = (item, response, status, headers) => {
      this.attachmentList.push(JSON.parse(response));
      console.log(JSON.parse(response));
      console.log(item);
      console.log(this.attachmentList);
      
    }

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }

}
