import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()

export class PendingGuardService implements CanActivate {


  constructor(private auth: AuthService, private user: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const payload:any = this.auth.getPayload();
    if(payload.status == "pending" || payload.status == "inactive"){
      this.router.navigate(['not-activated'])
      return false;
    }
    else {
      return true
    }

  }
}