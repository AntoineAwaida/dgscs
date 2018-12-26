import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-not-admin',
  templateUrl: './not-admin.component.html',
  styleUrls: ['./not-admin.component.scss']
})
export class NotAdminComponent implements OnInit {

  payload;

  constructor(private auth : AuthService) { }

  ngOnInit() {
    this.payload = this.auth.getPayload();
  }

}
