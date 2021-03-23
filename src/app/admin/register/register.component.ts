import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
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
  authMessage: any;
  userType: any = 'Supplier';
  userSignUpForm: FormGroup;
  provinces: Observable<Province[]> | undefined;
  bankName:  Observable<Bank[]> | undefined ;
  bankType: Observable<Accounts[]> | undefined
  cetificate: any;
  constructor(
    protected form: FormBuilder,
    public afAuth: AuthService,
    public userServ: UserService,
    protected storage: AngularFireStorage
    ) {
      this.userSignUpForm =this.form.group({
        fullName: ['', [Validators.required]],
        phoneNo: ['', [Validators.required, Validators.pattern('')]],
        emailAddress: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        userType: ['supplier', Validators.required],
        supplierStatus: [false, Validators.required],
        farmName: ['',[Validators.required]],
        streetAddress: ['', [Validators.required]],
        city: ['', [Validators.required]],
        provinceName: ['', [Validators.required]],
        farmCertificate: ['',[Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern('')]],
        accHolderName: ['', [Validators.required]],
        bankName: ['', [Validators.required]],
        accountNumber: ['', Validators.required],
        accountType: ['', [Validators.required]],
        branchCode: ['',[Validators.required, Validators.pattern('')]]
       });
   }

  ngOnInit(): void {

    this.provinces = this.afAuth.getProvinces();
    this.bankName = this.afAuth.getBankName();
    this.bankType = this.afAuth.getAccountType();
  }
  createAccount(){
    this.step = this.step + 1;

    if(this.step == 4){
      var path = `Certificate/ ${this.cetificate.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(path);
      this.storage.upload(path,this.cetificate).snapshotChanges().pipe(
        finalize(()=>{

         fileRef.getDownloadURL().subscribe((url)=>{
         // updating the ceticicate with url
           this.userSignUpForm.patchValue({
             farmDetails:{

               farmCIPCCertificate: "dean"
             }
           })
         })

        })
      ).subscribe();
    }
    this.afAuth.SignUp(this.userSignUpForm.controls.emailAddress.value, this.userSignUpForm.controls.emailAddress.value);
  }
  previous(){
    this.step = this.step - 1;
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
