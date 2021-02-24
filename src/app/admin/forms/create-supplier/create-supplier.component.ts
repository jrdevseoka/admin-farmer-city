import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private route: Router, private form: FormBuilder) { }
  supplierForm = this.form.group({
   userDetails: this.form.group({
     fullName: [''],
     emailAddress: [''],
     phoneNumber: [''],
     password: [''],
     confirPassword: ['']
   }),
   farmDetails: this.form.group({
    farmName: [''],
    address: this.form.group({
      streetAddress: [''],
      city: [''],
      province: [''],
      zipCode: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    }),
    paymentDetails: this.form.group({
      accountHolderName: ['', Validators.required],
      accountNo: ['', Validators.required],
      accountType: ['', Validators.required],
      bankName: ['', Validators.required],
      bankCode: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    }),
    status: ['Not Approved']
   })
  })

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
