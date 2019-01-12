import { Component, OnInit, Input } from '@angular/core';
import { WorkPackage } from 'src/app/services/workpackages.service';

@Component({
  selector: 'app-wptask',
  templateUrl: './wptask.component.html',
  styleUrls: ['./wptask.component.scss']
})
export class WptaskComponent implements OnInit {

  @Input() workpackage: WorkPackage;

  constructor() { }

  ngOnInit() {
  }

}
