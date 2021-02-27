import { CrudService } from './../../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from "../customValidators.validator";
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize} from "rxjs/operators";
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
      status: new FormControl('Approved'),
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

  constructor(private route: Router,private firebaService :CrudService, private storage :AngularFireStorage) { }
  cetificate :any;
  url :any
 // url :string;
  ngOnInit(): void {
  }

  //reading the fine input
  selectedImg(event :any)
  {


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

  registerSupplier(){
    this.supplierForm.asyncValidator;
    this.step = this.step + 1;
    if(this.step == 4)
    {
      //uploadin fileto the database
      var path = `Certificate/ ${this.cetificate.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(path)
     this.storage.upload(path,this.cetificate).snapshotChanges().pipe(
       finalize(()=>{

        fileRef.getDownloadURL().subscribe((url)=>{
        // updating the ceticicate with url
          this.supplierForm.patchValue({
            farmDetails:{

              farmCIPCCertificate: "dean"
            }
          })

        })

       })
     ).subscribe();





      //this.route.navigate(['/success']);
        // calling fuction to create suplier infdor
   this.firebaService.saveSupplierInformation(this.supplierForm.value)

    }
  }
  previous(){
    this.step =  this.step - 1;
  }

}
