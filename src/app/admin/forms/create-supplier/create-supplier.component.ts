import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier';
import { ConfirmPasswordValidator } from "../customValidators.validator";
@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit {

  //Set the representative form to default
  step : any = 1;
  supplierForm = new  FormGroup({
    repDetails: new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      phoneNo: new FormControl('', [Validators.required, Validators.pattern("^((\\+27-?)|0)?[0-9]{10}$")]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    }),
    farmDetails: new FormGroup({
      farmName: new FormControl('', Validators.required),
      address: new FormGroup({
        streetAddress: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        province: new FormControl('', Validators.required),
        zipCode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      }),
      status: new FormControl(''),
      farmCertificate: new FormControl(''),
      farmCIPCCertificate: new FormControl('', Validators.required),
    }),
    paymentDetails: new FormGroup({
      accountHolderName: new FormControl('', Validators.required),
      accountNo: new FormControl('', Validators.required),
      accountType: new FormControl('', Validators.required),
      bankName: new FormControl('', Validators.required),
      bankCode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    }),
  })
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  registerSupplier(){
    this.supplierForm
    this.step = this.step + 1;
    if(this.step == 4)
    {
      this.route.navigate(['/success']);
    }
  }
  previous(){
    this.step =  this.step - 1;
  }

}
