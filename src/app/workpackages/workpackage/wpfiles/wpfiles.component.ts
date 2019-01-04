import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkpackagesService } from 'src/app/services/workpackages.service';
import { ActivatedRoute } from '@angular/router';
import { TimeInterval, timeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-wpfiles',
  templateUrl: './wpfiles.component.html',
  styleUrls: ['./wpfiles.component.scss']
})
export class WpfilesComponent implements OnInit {


  files:Array<File>;
  
  form: FormGroup;
  fileSent = false;


  wp:string;

  @ViewChild('fileInput') fileInput: ElementRef;

  @Input() workpackage;

  constructor(private fb: FormBuilder, private workpackageService : WorkpackagesService, private route:ActivatedRoute) { 

    this.createForm();

  
  }

  ngOnInit(){

    this.route.params.subscribe(
      params => {

        this.wp = params.id;
      
      })

  }

  createForm() {
    this.form = this.fb.group({file:null})
  }




  onSubmit() {


    let data = new FormData();
    data.append('file', this.form.get('file').value)
    data.append('wp', this.wp)
    this.workpackageService.addFile(data,this.wp).subscribe((res:any) => {
      console.log(res);
      this.fileSent = true;
      setTimeout(() => { this.fileSent = false }, 3000);
    }, (error:any) => console.log(error))



  }


  onFileChange(event){
    if (event.target.files && event.target.files[0]){
      this.form.get('file').setValue(event.target.files[0]);
    }
  }

}
