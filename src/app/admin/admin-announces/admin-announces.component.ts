import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AnnouncesService } from 'src/app/services/announces.service';

@Component({
  selector: 'app-admin-announces',
  templateUrl: './admin-announces.component.html',
  styleUrls: ['./admin-announces.component.scss']
})
export class AdminAnnouncesComponent implements OnInit {

  announce_to_edit:string;

  msg:string;

  error:string;

  showAddForm:boolean = false;
  showTable:boolean = true;


  announces:Array<any> = [];

  ready:boolean = false;

  constructor(private announceService: AnnouncesService) { }

  ngOnInit() {

    this.getAnnounces();

  }

    

  @ViewChild(MatPaginator) paginator: MatPaginator;



  displayedColumns: string [] = ['title','date', 'actions']

  dataSource = new MatTableDataSource(this.announces);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 
  getAnnounces(){

    this.announceService.getAnnounces().subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.ready = true;
    }, (error:any)=>this.error = error);

  }

   delete(id){
     const result = confirm("Voulez-vous vraiment supprimer cette annonce?")
     if (result){
      this.announceService.deleteAnnounce(id).subscribe((res:any) => {
        this.msg = res;
        setTimeout(() => {this.msg=null}, 4000)
        this.getAnnounces();
       },
       (error)=> {
         this.error = error;
         setTimeout(() => {this.error=null}, 4000)
       })


     }
     
   }

  toggleEditForm(announceid){
    this.showAddForm = !this.showAddForm
    this.showTable = !this.showTable
    this.announce_to_edit = announceid
  }

  toggleAddForm(){
    this.showAddForm = !this.showAddForm
    this.showTable = !this.showTable
    this.announce_to_edit = null;
  }

  onSubmitted(msg){
    this.toggleAddForm()
    this.msg = msg;
    setTimeout(() => {this.msg = null}, 4000);
    this.getAnnounces()
  }

}

