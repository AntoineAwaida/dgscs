import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dgscs';
  sidenavOpened = false;

  constructor(public auth: AuthService) {
  }

  toogleSidenav() {
    this.sidenavOpened = !this.sidenavOpened
  }
}

