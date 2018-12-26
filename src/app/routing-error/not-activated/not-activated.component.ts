import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-not-activated',
  templateUrl: './not-activated.component.html',
  styleUrls: ['./not-activated.component.scss']
})
export class NotActivatedComponent implements OnInit {

  payload;

  constructor(private auth : AuthService) { }

  ngOnInit() {
    this.payload = this.auth.getPayload();
  }

}
