import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { GroupsService } from '../services/groups.service';
import { WorkpackagesService, WorkPackage } from '../services/workpackages.service';
import { TaskService, Task } from '../services/task.service';
import { element } from '@angular/core/src/render3';







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


  element_selected : Array<any> = [];

  mission_fav;
  wp_fav: Array<WorkPackage> = [];
  tasks_fav: Array<Task> = [];

  tasks: Array<Task> = [];


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
    this.getFavs(this.user._id);

  }

  getFavs(id){

    this.userService.getFavsUser(id).subscribe((res:any) => {
      this.element_selected = res.favWorkPackages.concat(res.favTasks);
      console.log(this.element_selected)
    },
    (error) => this.error = error
    )

  }

  getWorkPackages(id){
    
    this.userService.getWorkPackages(id).subscribe((res:any)=> {

      this.workpackages = res;

    },
    (error => {
      console.log(error)
    })
    )

  }

  getTasks(){
    
    this.taskService.getTasks().subscribe((res:any)=> {

      this.tasks = res;


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

  onFavSubmit(){

    this.element_selected.forEach(e => {

      if (this.instanceOfWorkpackage(e)){
        this.wp_fav.push(e)
      }

      else if (this.instanceOfTasks(e)){
        this.tasks_fav.push(e)
      }

      else if (this.instanceOfMission(e)){
        this.mission_fav.push(e)
      }

    })

    this.userService.modifyFav(this.user._id,{favwp:this.wp_fav, favtasks:this.tasks_fav}).subscribe((res:any)=>{

      this.modified_profile= true
      setTimeout(() => this.modified_profile = false, 4000);

    } , (error)=> this.error=error);


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


  addElement(element){
    if (!this.element_selected.some(e => (e._id == element._id) && (this.sameType(e,element)))){
      this.element_selected.push(element)
    }
      this.recherche = ''
      this.element_searched = []
  }

  deleteElement(element){
    this.element_selected = this.element_selected.filter(item => item!=element)
  }

  
  instanceOfWorkpackage(object: any): object is WorkPackage {
    return 'tasks' in object; //marqueur d'un wp : un wp a des taches comme attribut, pas une tache ni une mission!
  }
  
  instanceOfTasks(object: any): object is Task {
    return 'endingDate' in object; //marqueur d'une tache: une tache a une date de fin comme attribut, pas un wp ni une mission!
  }
  
  instanceOfMission(object:any) {
  
    return false; //à compléter
  
  }

  sameType(e1:any,e2:any){

    if(this.instanceOfWorkpackage(e1) && this.instanceOfWorkpackage(e2)){
      return true;
    }
  
    if(this.instanceOfTasks(e1) && this.instanceOfTasks(e2)){
      return true;
    }
  
    if (this.instanceOfMission(e1) && this.instanceOfMission(e2)){
      return true;
    }
  
  
    return false;
  
  }

}

