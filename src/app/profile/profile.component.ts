import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:any;
  profilepicture:any;
  preview:any;
  form: FormGroup;

  modified_profile: boolean = false; //true pour indiquer à l'utilisateur que son profil a été correctement modifié.
  error: string;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private auth: AuthService, private fb: FormBuilder, private userService: UserService) { 

    this.createForm();

  }

  createForm() {
    this.form = this.fb.group({profilepicture:null})
  }

  ngOnInit() {

    this.user = this.auth.getPayload()
    console.log(this.user)

  }

  onSubmit() {


    let data = new FormData();
    data.append('profilepicture', this.form.get('profilepicture').value)
    data.append('user', this.user._id)
    this.userService.setPicture(data, this.user._id).subscribe((res:any) => {
      this.modified_profile = true;
      setTimeout(() => this.modified_profile = false, 4000);
    }, (error) => {
      this.error = error;
      setTimeout(() => this.error = null, 4000);
      console.log(error);
    })


  }


  onPPChange(event){
    if (event.target.files && event.target.files[0]){
      this.form.get('profilepicture').setValue(event.target.files[0]);
      this.profilepicture = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.preview = event.target.result;
      }
    }
  }

}
