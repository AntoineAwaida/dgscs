import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface UserDetails {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

@Injectable()

export class AuthService {

  private token: string;

  constructor(private httpClient: HttpClient, private router: Router) { }

  private b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
      var code = p.charCodeAt(0).toString(16).toUpperCase();
      if (code.length < 2) {
        code = '0' + code;
      }
      return '%' + code;
    }));
  }

  private base64_url_decode(str) {
    var output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw "Illegal base64url string!";
    }

    try {
      return this.b64DecodeUnicode(output);
    } catch (err) {
      return atob(output);
    }
  };

  public saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    console.log("Utilisateur déconnecté")
    this.router.navigateByUrl('/login');
  }

  public getPayload(){
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = this.base64_url_decode(payload);
      return JSON.parse(payload);
    } else {
      return false;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getPayload();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<Object> {
    return this.httpClient.post("http://localhost:3000/api/users/register", user)

  }

  public login(user: TokenPayload): Observable<Object> {
    return this.httpClient.post("http://localhost:3000/api/users/login", user)
  }

  public create10(start){
    for(var i=start; i<start+10; i++){
      var user : TokenPayload = {
        first_name : 'user',
        last_name : ''+ i,
        email : "user@"+i,
        password : 'password',
      }
      this.register(user).subscribe((res)=>{
        console.log(res);
      }, error => {
        console.log(error)
      });
      console.log(user);
    }
  }

}
