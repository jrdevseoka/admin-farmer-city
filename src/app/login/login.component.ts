import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public form: FormBuilder
    ) {
    this.userSignInForm = this.form.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
   }
  userSignInForm: FormGroup
  ngOnInit(): void {
  }
  submitMethod(){
    this.auth.loginWithEmailAndPassWord(this.userSignInForm.controls.emailAddress.value, this.userSignInForm.controls.password.value);
  }
}
