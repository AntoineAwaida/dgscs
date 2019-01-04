import { Component, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { UserService } from '../../../services/user.service'

import { GroupsService } from '../../../services/groups.service'
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-add-groups-form',
  templateUrl: './add-groups-form.component.html',
  styleUrls: ['./add-groups-form.component.scss']
})
export class AddGroupsFormComponent implements OnInit {



  @Output() onSubmitted: EventEmitter<any> = new EventEmitter<any>();

  @Input() 
  set groupid(groupid:string){
    if (groupid){
      this.editform = groupid;
      this.getGroup(groupid);
    }
  }; //si c'est une édition de groupe, on y renseigne simplement l'id du groupe au départ et le formulaire reste le même.

  editform:string; //a une valeur si c'est un formulaire d'édition (bouton jaune, requête put...)

  error:String = null;
  members:Array<any> = [];
  name:string;
  users:Array<any> = [];
  users_searched: Array<String> = [];
  recherche='';
  groups = [];
  exists:boolean = false;


  constructor(private userService: UserService, private groupsService : GroupsService) { }

  async ngOnInit() {
    this.getUsers();
  }


  async onSubmit(f) {

    this.exists = false;

    if (this.members.length==0 || !f.value.name){

      this.error = "Merci de bien remplir un nom de groupe, et d'ajouter au moins 1 membre au groupe."
      setTimeout(() => {this.error=null}, 4000)

    }

    else {
    const members_id = []

    for (let member of this.members){
      members_id.push(member._id)
    }

    const group = {
      name: f.value.name,
      members: members_id
    }

    

    //vérification de si le groupe existe déjà

    //ça marche pas actuellement...

    
    await this.groupsService.getGroups().subscribe((res:any) => {
      this.groups = res;
      console.log(this.groups)
    },(error) => {
      console.log(error);
      console.log("impossible de reçevoir les groupes.");
    })


    this.groups.map((existing_group) => {
      console.log(existing_group)
      if (group.name == existing_group.name){
        this.exists = true;
        console.log("coucou")
      }
    })


    //s'il n'existe pas déjà on le crée.

    if (this.exists === false){

      if(!this.editform){

        //si c'est le formulaire de création, alors on crée le groupe
        this.groupsService.createGroup(group)
      .subscribe((res:any) => {
        this.onSubmitted.emit(res);
      }, (error) => {
        console.log(error);
        this.error = error;
      })

      }

      else {
        //sinon on l'édite
        this.groupsService.editGroup(group,this.editform)
        .subscribe((res:any) => {
          this.onSubmitted.emit(res);
        }, (error) => {
          console.log(error);
          this.error = error;
        })
       
      }

      


    }

    
    

    }


  }

  onSearch() {

    this.users_searched = [];
    if (this.recherche.length>=2){

    
      for (let user of this.users) {

        const name = user.first_name +" " + user.last_name;
        if (name.toLowerCase().includes(this.recherche.toLowerCase())){
          this.users_searched.push(user)
        }

      }
  
    }

  }
  
  addUser(user){
    //vérifie d'abord s'il n'y a pas déjà cet utilisateur ajouté à la liste des membres...
    if (!this.members.some(e => e._id == user._id)){
      this.members.push(user)
    }
      this.recherche = ''
      this.users_searched = []
  }

  deleteUser(member){
    this.members = this.members.filter(item => item!=member)
  }
  
  getUsers() {
    this.userService.getActiveUsers()
    .subscribe((res:any) => {
      this.users = res;
    },(error) => {
      console.log(error);
      console.log("impossible de recevoir user");
    })
  }

  async getUser(userid) {

    await this.userService.getUser(userid)
    .subscribe((res:any)=> {
      this.members.push(res)
    }, (error) => {
      console.log(error);
    })


  }

  async getGroup(groupid){
    this.groupsService.getGroup(groupid).subscribe(async (res:any) => {

      this.name = res.name


      await Promise.all(res.members.map(async (member) => 
      {
        this.getUser(member._id)
      }
      ))

    },
    (error)=> {
      console.log(error)
    })
  }
  


}
