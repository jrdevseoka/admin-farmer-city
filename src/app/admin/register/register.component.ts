import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  step:number = 1;
  userSignUpForm: FormGroup
  constructor(protected form: FormBuilder) {
    this.userSignUpForm = this.form.group({});
   }

  ngOnInit(): void {
  }
  createAccount(){
    this.step = this.step + 1;
  }
  previous(){
    this.step = this.step - 1;
  }
  selectedImg(image:any){
  }
}
