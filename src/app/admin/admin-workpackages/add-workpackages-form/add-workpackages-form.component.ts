import { Component, OnInit, Output, Input } from '@angular/core';
import { WorkpackagesService } from 'src/app/services/workpackages.service';

import { Group, GroupsService } from '../../../services/groups.service'

import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-workpackages-form',
  templateUrl: './add-workpackages-form.component.html',
  styleUrls: ['./add-workpackages-form.component.scss']
})
export class AddWorkpackagesFormComponent implements OnInit {

  @Output() onSubmitted: EventEmitter<any> = new EventEmitter<any>();

  @Input() 
  set wpedit(wpedit:string){
    if (wpedit){
      this.editform = wpedit;
      this.getWorkPackage(wpedit);
    }
  };

  editform:string;

  name:string;
  description:string;

  groups_searched: Array<any> =[];
  groups:Array<any> = [];
  groups_selected:Array<any> = [];
  error:string;
  tasks: Array<string> = [];
  recherche:string;
  status:string = 'active';
  waiting_result:boolean = false;


  constructor(private workpackagesService: WorkpackagesService,private groupService: GroupsService) { }

  ngOnInit() {
    this.getGroups();
  }

  async onSubmit(f) {


    this.waiting_result = true;


    if (!f.value.name){

      this.error = "Merci de bien remplir un nom de workpackage."
      setTimeout(() => {this.error=null}, 4000)
      this.waiting_result = false;

    }

    

    else {

      //vérification s'il existe déjà un WP du meme nom?
      //s'il n'existe pas déjà on le crée.

      const workpackage = {
        name: f.value.name,
        description: f.value.description,
        tasks: this.tasks,
        status: this.status,
        groups: this.groups_selected
      } 


      if (!this.editform){

        this.workpackagesService.createWorkPackage(workpackage).subscribe((res:any)=> {
          this.onSubmitted.emit(res);
          this.waiting_result = false;
        },
        (error)=> {
          this.error = error;
          console.log(error);
          this.waiting_result = false;
        })

      }

      else {

        this.workpackagesService.editWorkPackage(workpackage, this.editform).subscribe((res:any)=> {
          this.onSubmitted.emit(res);
          this.waiting_result = false;
        },
        (error)=> {
          this.error = error;
          console.log(error);
          this.waiting_result = false;
        })


      }
      
    }




      


  }

  

  addGroup(group){
    //vérifie d'abord s'il n'y a pas déjà cet utilisateur ajouté à la liste des membres...
    if (!this.groups_selected.some(e => e._id == group._id)){
      this.groups_selected.push(group)
    }
      this.recherche = ''
      this.groups_searched = []
  }

  deleteGroup(group){
    this.groups_selected = this.groups_selected.filter(item => item!=group)
  }

  getGroups(){
    this.groupService.getGroups().subscribe((res:any)=> {
      this.groups = res;
    },
    (error)=> {
      this.error = error;
      console.log(error);
    })
  }

  getWorkPackage(id){
    this.workpackagesService.getWorkPackage(id).subscribe((res:any) => {

      this.name = res.name
      this.status = res.status
      this.description = res.description
      this.groups_selected = res.groups
      

    },
    (error) => {
      this.error = error
      console.log(error)
    })
  }

  onSearch() {

    this.groups_searched = [];
    if (this.recherche.length>=2){

    
      for (let group of this.groups) {

        if (group.name.toLowerCase().includes(this.recherche.toLowerCase())){
          this.groups_searched.push(group)
        }

      }
  
    }

  }

}
