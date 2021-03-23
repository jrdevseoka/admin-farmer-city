import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-passwrod',
  templateUrl: './forgot-passwrod.component.html',
  styleUrls: ['./forgot-passwrod.component.css']
})
export class ForgotPasswrodComponent implements OnInit {
  forgotPassword: FormGroup  = this.form.group({})
  constructor(public auth: AuthService,
    public form : FormBuilder) { }

  ngOnInit(): void {
  }
  forgot(){

  }
}
