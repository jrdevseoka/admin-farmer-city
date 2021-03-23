import { CrudService } from '../../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Province, Supplier } from 'src/app/models/supplier';
import { ConfirmPasswordValidator } from "../../forms/customValidators.validator";
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize} from "rxjs/operators";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit {

  //Set the representative form to default
  step : any = 1;

  constructor(
  private route: Router,
  private crud :CrudService,
  private storage :AngularFireStorage,
  private form: FormBuilder,
  private firestore: AngularFirestore
  ) {
   // this.provinceCollection = firestore.collection<Province>('provinces');
  }

supplierForm = this.form.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern("^((\\+27-?)|0)?[0-9]{10}$")]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      status: ['Approved'],
    farmDetails: this.form.group({
     farmName: ['', [Validators.required]],
      address: this.form.group({
        streetAddress: ['', [Validators.required]],
        city: ['', Validators.required],
        provinceName:  ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        farmCertificate: ['', [Validators.required]],
        farmCIPCCertificate: ['', Validators.required],
      }),
    }),
    paymentDetails: this.form.group({
      accountHolderName: ['', Validators.required],
      accountNo: ['', [Validators.required]],
      accountType:  ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      bankCode: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    }),
  })

  //Retrieving provinces from the database
  provinces: any;
  cetificate :any;
  url :any
 // url :string;
  ngOnInit() {
    this.crud.getProvince().valueChanges().subscribe(result=>{

      this.provinces = result
    })
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
        // calling fuction to create suplier infdor
         this.crud.saveSupplierInformation(this.supplierForm.value);
         this.route.navigate(['/success']);

    }
  }
  previous(){
    this.step =  this.step - 1;
  }

}
