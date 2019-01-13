import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AnnouncesService } from 'src/app/services/announces.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-announces-form',
  templateUrl: './add-announces-form.component.html',
  styleUrls: ['./add-announces-form.component.scss']
})
export class AddAnnouncesFormComponent{

  @Output() onSubmitted: EventEmitter<any> = new EventEmitter<any>();

  @Input() 
  set announceid(announceid:string){
    if (announceid){
      this.editform = announceid;
      this.getAnnounce(announceid);
    }
  };

  editform:string;

  public options: Object = {
    placeholderText: "Contenu de l'annonce..."
  }
  
  title:string;

  date:Date;

  author:any; //à remplacer par une interface User

  content:string;


  error:string;
  waiting_result:boolean = false;




  constructor(private announceService: AnnouncesService, private authService: AuthService) { }



  async onSubmit(f) {

    


    this.waiting_result = true;

  

    if (!f.value.title || !this.content){

      this.error = "Merci de bien donner un titre et un contenu à l'annonce."
      setTimeout(() => {this.error=null}, 4000)
      this.waiting_result = false;

    }

    

    else {

      //vérification s'il existe déjà un WP du meme nom?
      //s'il n'existe pas déjà on le crée.

      const announce = {
        title: this.title,
        content: this.content,
        author: this.authService.getPayload()._id

      } 


      if (!this.editform){

        this.announceService.createAnnounce(announce).subscribe((res:any)=> {
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

        this.announceService.editAnnounce(announce, this.editform).subscribe((res:any)=> {
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

  

  getAnnounce(id){
    this.announceService.getAnnounce(id).subscribe((res:any) => {

      this.title = res.title
      this.content = res.content
      this.date = res.date
      

    },
    (error) => {
      this.error = error
      console.log(error)
    })
  }



}
