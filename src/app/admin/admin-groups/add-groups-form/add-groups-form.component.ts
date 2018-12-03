import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service'

import { GroupsService } from '../../../services/groups.service'

@Component({
  selector: 'app-add-groups-form',
  templateUrl: './add-groups-form.component.html',
  styleUrls: ['./add-groups-form.component.scss']
})
export class AddGroupsFormComponent implements OnInit {

  @Input() displayed:boolean;
  sent:boolean = false;
  error:String = null;
  members:Array<any> = [];
  users:Array<any> = [];
  users_searched: Array<String> = [];
  recherche='';
  groups = [];
  exists:boolean = false;


  constructor(private userService: UserService, private groupsService : GroupsService) { }

  ngOnInit() {
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

      this.groupsService.createGroup(group)
      .subscribe((res:any) => {
        console.log(res)
        this.sent = true;
        setTimeout(() => {this.sent = false}, 4000);
        this.members = [];
      }, (error) => {
        console.log(error);
        this.error = error;
      })


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
    this.members.push(user)
    this.recherche = ''
    this.users_searched = []
  }

  deleteUser(member){
    this.members = this.members.filter(item => item!=member)
  }
  
  getUsers() {
    this.userService.getUsers()
    .subscribe((res:any) => {
      this.users = res;
    },(error) => {
      console.log(error);
      console.log("impossible de reçevoir user");
    })
  }
  


}
