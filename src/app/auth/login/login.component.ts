import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  animations : [
    trigger('fade', [
      
      state('in', style({
        opacity: '1'
      })),

      state('out', style({
        opacity: '0'
      })),

      transition('in => out', [
        animate('1s')
      ]),

      transition('out => in', [
        animate('0.1s')
      ])

    ]),
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  popup: boolean= false;
  in : boolean = false;

  f: FormGroup;

  redirect : string;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    setTimeout(() => {this.in = true}, 200)

    this.route.queryParams
    .subscribe(params => {
      this.redirect = params['redirect'];
    });
  }


  initForm() {
    this.f = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login():void {
    this.credentials.email = this.f.value['email']
    this.credentials.password = this.f.value['password']
    this.auth.login(this.credentials)
      .subscribe(
        (res: any) => {
          this.auth.saveToken(res.token);
          console.log("Authentification de l'utilisateur terminé");
          this.router.navigateByUrl(this.redirect);
        },
        (error) => {
          console.log("Impossible d'authentifier l'utilisateur");
          if(!this.popup){
            this.popup = true;
            setTimeout(() => {this.popup = false}, 4000)
          }
        });
  }
}