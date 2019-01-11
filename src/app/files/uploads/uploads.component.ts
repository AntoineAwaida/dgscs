import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {

  files = [];
  loader = true;

  constructor(private fileService : FileService) { }

  ngOnInit() {
    this.fileService.getMyFiles().subscribe((res)=>{
      this.files = res;
      this.loader = false;
      console.log(res);
    }, err => {
      console.log("impossible de récupérer les fichiers")
      console.log(err);
      this.loader = true;
    })
  }

}
