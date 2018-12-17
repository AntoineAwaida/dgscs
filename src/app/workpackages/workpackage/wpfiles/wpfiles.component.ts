import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkpackagesService } from 'src/app/services/workpackages.service';

@Component({
  selector: 'app-wpfiles',
  templateUrl: './wpfiles.component.html',
  styleUrls: ['./wpfiles.component.scss']
})
export class WpfilesComponent implements OnInit {

  @Input() workpackage;

  files:Array<File>;
  
  form: FormGroup;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder, private workpackageService : WorkpackagesService) { 

    this.createForm();

  
  }

  ngOnInit(){
  }

  createForm() {
    this.form = this.fb.group({file:null})
  }




  onSubmit() {


    let data = new FormData();
    data.append('file', this.form.get('file').value)
    data.append('wp', this.workpackage._id)
    this.workpackageService.addFile(data,this.workpackage._id).subscribe((res:any) => console.log(res), (error:any) => console.log(error))



  }


  onFileChange(event){
    if (event.target.files && event.target.files[0]){
      this.form.get('file').setValue(event.target.files[0]);
    }
  }

}
