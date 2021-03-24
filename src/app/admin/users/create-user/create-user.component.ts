import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Accounts, Bank, Province } from 'src/app/models/supplier';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userSignUpForm: FormGroup;
  step:number = 1;
  authMessage: any;
  provinces: Observable<Province[]> | undefined;
  bankName:  Observable<Bank[]> | undefined ;
  bankType: Observable<Accounts[]> | undefined
  constructor(
    private form: FormBuilder,
    protected service: UserService,
    protected auth: AuthService
    ) {
    this.userSignUpForm =this.form.group({
      repDetails: this.form.group({
       fullName: ['', [Validators.required]],
       phoneNo: ['', [Validators.required, Validators.pattern('')]],
       emailAddress: ['', [Validators.required, Validators.email]],
       password: ['', Validators.required],
       confirmPassword: ['', Validators.required],
       userType: ['supplier', Validators.required],
      }),
      farmDetails: this.form.group({
       farmName: ['',[Validators.required]],
       streetAddress: ['', [Validators.required]],
       city: ['', [Validators.required]],
       provinceName: ['', [Validators.required]],
       farmCertificate: ['',[Validators.required]],
       zipCode: ['', [Validators.required, Validators.pattern('')]],
      }),
       applicationStatus: [false, Validators.required],
       accountDetails: this.form.group({
       accountHolderName: ['', [Validators.required]],
       bankName: ['', [Validators.required]],
       accountNo: ['', Validators.required],
       bankType: ['', [Validators.required]],
       bankCode: ['',[Validators.required, Validators.pattern('')]]
       })

      });
   }
   cetificate: any;
  ngOnInit(): void {
    this.provinces = this.auth.getProvinces();
    console.log(this.provinces)
    this.bankName = this.auth.getBankName();
    this.bankType = this.auth.getAccountType();
  }
  createAccount(){
    this.userSignUpForm.asyncValidator;
    this.step = this.step + 1;
    if(this.step == 3)
    {
      //uploadin fileto the database
        // calling fuction to create suplier infdor
        this.service.uploadFileToDB();

        if(this.userSignUpForm.valid){
          this.auth.SignUp(this.userSignUpForm.value)
        }



    }
  }
  previous(){
    this.step = this.step-1;
  }
  selectedImg(event:any){
    if(event.target.files&& event.target.files[0])
    {
      const reader= new FileReader();



      reader.readAsDataURL(event.target.files[0]);
      this.cetificate = event.target.files[0];

       //this.image=  reader.readAsDataURL(e.target.files[0]);
    }
    else{
      //this.url= "./assets/image-holder.png";
      this.cetificate=null

    }
  }
}
