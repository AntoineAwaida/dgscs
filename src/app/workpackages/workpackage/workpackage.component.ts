import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkpackagesService, WorkPackage } from 'src/app/services/workpackages.service';

import { Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-workpackage',
  templateUrl: './workpackage.component.html',
  styleUrls: ['./workpackage.component.scss']
})
export class WorkpackageComponent implements OnInit {



  workpackage$: Observable<any>

  constructor(private route: ActivatedRoute, private router: Router, private workpackageService: WorkpackagesService) { }

  ngOnInit() {
    this.workpackage$ = this.route.paramMap.pipe(switchMap((params:ParamMap) => this.workpackageService.getWorkPackage(params.get('id'))));
  }

}
