import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var path = state.url.split('?')[0];
    if (this.auth.isLoggedIn()) {
      if ((path == '/login') || (path == '/register')) {
        this.router.navigate(['dashboard'])
        return false
      }
      else {
        return true;
      }
    }
    else {
      if (path == '/dashboard') {
        this.router.navigate(['login'])
        return false
      }
      else if (path == '/login') {
        return true
      }
      else if (path == '/register') {
        return true
      }
      else {
        this.router.navigate(['login'],
          { queryParams: { redirect: path } }
        );
        return false;
      }
    }
  }
}