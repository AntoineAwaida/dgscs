import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { timingSafeEqual } from 'crypto';
import { GroupsService } from '../services/groups.service';
import { WorkpackagesService, WorkPackage } from '../services/workpackages.service';
import { TaskService } from '../services/task.service';
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

  recherche:string;

  workpackages: Array<WorkPackage> = [];

  wp_selected: Array<WorkPackage> = [];


  tasks: Array<any> = [];

  tasks_selected : Array<any> = [];

  element_searched: Array<any> = [];

  f2: FormGroup;

  modified_profile: boolean = false; //true pour indiquer à l'utilisateur que son profil a été correctement modifié.
  error: string;


  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private auth: AuthService, private fb: FormBuilder, private taskService: TaskService,
    private userService: UserService) { 

    this.createForms();

  }

  createForms() {
    this.form = this.fb.group({profilepicture:null})
    this.f2 = this.fb.group({
      password: [{value:'',disabled:false}, [Validators.required, Validators.minLength(8)]],
      password2: [{value:'',disabled:false}, [Validators.required]]
    })
  }

  ngOnInit() {

    this.user = this.auth.getPayload()
    this.getWorkPackages(this.user._id);
    this.getTasks();

  }

  getWorkPackages(id){
    
    this.userService.getWorkPackages(id).subscribe((res:any)=> {

      this.workpackages = res;
      console.log(this.workpackages)

    },
    (error => {
      console.log(error)
    })
    )

  }

  getTasks(){
    
    this.taskService.getTasks().subscribe((res:any)=> {

      this.tasks = res;
      console.log(this.tasks)

    },
    (error => {
      console.log(error)
    })
    )

  }

  onPPSubmit() {


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

  onPasswordSubmit() {

    this.userService.modifyPassword(this.user._id,{password:this.f2.value.password}).subscribe((res:any) => this.auth.logout(), (error)=> this.error = error);

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

  onChange(){
    if (this.f2.controls.password.status=='VALID') {
      this.f2.controls.password2.enable();
    } else {
      this.f2.controls.password2.setValue('');
      this.f2.controls.password2.disable();
    }
  }

  onSearch() {

    this.element_searched = [];
    if (this.recherche.length>=2){

    
      for (let wp of this.workpackages) {

        if (wp.name.toLowerCase().includes(this.recherche.toLowerCase())){
          this.element_searched.push(wp)
        }

      }

      for (let task of this.tasks) {

        if (task.name.toLowerCase().includes(this.recherche.toLowerCase())){
          this.element_searched.push(task);
        }

      }


  
    }

  }

}

