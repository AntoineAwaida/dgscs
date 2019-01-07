
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { TaskFileEditDialogComponent } from './task-file-edit-dialog/task-file-edit-dialog.component';
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
  editArray = [];

  attachmentList:any = [];

  constructor(private auth : AuthService, private dialog: MatDialog) {
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
    
      this.editArray.map(result => {
        if (result.item === item){

          if (result.name){
            form.append("name", result.name);
          }

          if (result.description){
            form.append("description", result.description);
          }

        }
      })

    
    };


    this.uploader.onCompleteItem = (item, response, status, headers) => {
      //this.attachmentList.push(JSON.parse(response)); //Si jamais on veut ajouter les réponses dans une liste
      console.log(JSON.parse(response));
      this.newFile.emit(JSON.parse(response).file);

    }

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }

  openDialog(item){
    const dialogRef = this.dialog.open(TaskFileEditDialogComponent, {
    })

    dialogRef.afterClosed().subscribe(result => {

      result.item = item;
      this.editArray.push(result);
      console.log(this.editArray);

      // if (result.name){
      //   item.formData.push({name : result.name})
      // }
      // if (result.description){
      //   item.formData.push({description : result.description})
      // }

      // item.file.name = result.name;
      // this.uploader.onBuildItemForm = (item, form) => {
      //   form.append("author", this.auth.getPayload()._id); 
      //   form.append("name", result.name);
      //   if(result.description){
      //     form.append("description", result.description);
      //   }
      // };
    });



  }

  



}
