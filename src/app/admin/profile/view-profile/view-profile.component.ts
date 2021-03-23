import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Accounts, Bank, Province, Roles } from 'src/app/models/supplier';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  step: any = 1;
  provinces: Observable<Province[]>;
  bankType: Observable<Accounts[]>
  bankName: Observable<Bank[]>;
  userType: Observable<Roles[]>;
  userInformation:  FormGroup;
  constructor(
    public form: FormBuilder,
    public auth: AuthService
    ) {
    this.userInformation =  this.form.group({
      userDetails: this.form.group({
        fullName: ['', [Validators.required]],
        phoneNo: ['', [Validators.required, Validators.pattern('')]],
        emailAddress: ['', [Validators.required, Validators.pattern('')]],
        userType: ['', Validators.required],
      }),
      farmDetails: this.form.group({
        farmName: ['',[Validators.required]],
        address: this.form.group({
          stAddress: ['', [Validators.required]],
          city: ['', [Validators.required]],
          provinces: ['', [Validators.required]],
          zipCode: ['', [Validators.required, Validators.pattern('')]]
        })
      }),
      accountDetails: this.form.group({
        accHolderName: ['', [Validators.required]],
        bankName: ['', [Validators.required]],
        accountNumber: ['', Validators.required],
        accountType: ['', [Validators.required]],
        branchCode: ['',[Validators.required, Validators.pattern('')]]
      })
    });
    this.userType = this.auth.getUserType();
    this.bankName = this.auth.getBankName();
    this.provinces = this.auth.getProvinces();
    this.bankType = this.auth.getAccountType();
  }

  ngOnInit(): void {

    this.userType = this.auth.getUserType();
    this.bankName = this.auth.getBankName();
    this.provinces = this.auth.getProvinces();
    this.bankType = this.auth.getAccountType();

    console.log(this.userInformation.get('userType')?.value);
  }
  selectedImg(selectedImg: any){

  }
  userTest: boolean = false;
  userTypeComparison(): boolean{
    if(this.userInformation.get('userType')?.value == 'Supplier')
    {
       this.userTest = true;
    }
    return this.userTest;
  }
  update(){

  }
  previous(){
    this.step =  this.step - 1;
  }

}
