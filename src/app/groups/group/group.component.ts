import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GroupsService, Group } from 'src/app/services/groups.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  group:Group;

  constructor(private route: ActivatedRoute, private groupService: GroupsService, private router: Router) { }

  ngOnInit() {

      this.route.paramMap.pipe(switchMap((params:ParamMap) => this.groupService.getGroup(params.get('id'))))
      .subscribe((res:any) => {
        this.group = res
      } , (error)=> console.log(error));
  

    }

  
}


