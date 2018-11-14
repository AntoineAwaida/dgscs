import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from '../../services/auth.service'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  popup: boolean= false;
  in : boolean = false;
  userError : boolean = false;

  f2: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {this.in = true}, 200);
    this.initForm();
    
  }

  initForm() {
    this.f2 = this.formBuilder.group({
      first_name : ['', [Validators.required]],
      last_name : ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [{value:'',disabled:false}, [Validators.required, Validators.minLength(8)]],
      password2: [{value:'',disabled:false}, [Validators.required]]
    });
  }

  onSubmit(f2):void {
    this.credentials.first_name = this.f2.value.first_name;
    this.credentials.last_name = this.f2.value.last_name;
    this.credentials.email = this.f2.value.email;
    this.credentials.password = this.f2.value.password;

    this.auth.register(this.credentials)
    .subscribe(
      (res:any) => {
        this.auth.saveToken(res.token);
        console.log("Enregistrement du user terminé");
        this.router.navigateByUrl('dashboard');
    },
    (error) => {
      console.log("Impossible d'enregistrer le user");
      this.userError = true;
    })
}

onChangeUserError(){
  this.userError = false;
}

onChange(){
  if (this.f2.controls.password.status=='VALID') {
    this.f2.controls.password2.enable();
  } else {
    this.f2.controls.password2.setValue('');
    this.f2.controls.password2.disable();
  }
}

}
