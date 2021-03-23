import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier, Province, Bank, Accounts } from 'src/app/models/supplier';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  step:number = 1;

  userType: any = 'Supplier';
  userSignUpForm: FormGroup;
  provinces: Observable<Province[]> | undefined;
  bankName:  Observable<Bank[]> | undefined ;
  bankType: Observable<Accounts[]> | undefined

  constructor(
    protected form: FormBuilder,
    public afAuth: AuthService,
    public userServ: UserService
    ) {
      this.userSignUpForm = this.userServ.userInformationForm();
   }

  ngOnInit(): void {
    this.provinces = this.afAuth.getProvinces();
    this.bankName = this.afAuth.getBankName();
    this.bankType = this.afAuth.getAccountType();
    this.userServ.userInformationForm();
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
