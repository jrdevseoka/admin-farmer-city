import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Supplier } from 'src/app/models/supplier';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userForm: FormGroup;
  supplierCollections:  AngularFirestoreCollection<Supplier>;
  cetificate: any;
  storage: any;
  constructor(
    protected firestore: AngularFirestore,
    public form: FormBuilder
    ) {
    this.supplierCollections = firestore.collection<Supplier>('Supplies');
    this.userForm = this.userInformationForm()
   }
   userInformationForm(): FormGroup{
     return this.form.group({
        fullName: ['', [Validators.required]],
        phoneNo: ['', [Validators.required, Validators.pattern('')]],
        emailAddress: ['', [Validators.required, Validators.pattern('')]],
        userType: ['supplier', Validators.required],
        supplierStatus: [false, Validators.required],
        farmName: ['',[Validators.required]],
        stAddress: ['', [Validators.required]],
        city: ['', [Validators.required]],
        provinces: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern('')]],
        accHolderName: ['', [Validators.required]],
        bankName: ['', [Validators.required]],
        accountNumber: ['', Validators.required],
        accountType: ['', [Validators.required]],
        branchCode: ['',[Validators.required, Validators.pattern('')]]
       });
     }
  registerUser(){

  }
  editUser(){

  }
  getSuppliers(): any{
    return this.firestore.collection<Supplier>('Supplies').snapshotChanges().pipe(
      map(actions => actions.map(e =>{
        const data = e.payload.doc.data() as Supplier;
        return {...data};
      }))
    )
  }
  getSuppliersByID(){

  }
  getUsers(){

  }
  getUserByID(){
  }
  uploadFileToDB(){
      //uploadin fileto the database
      var path = `Certificate/ ${this.cetificate.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(path)
       this.storage.upload(path,this.cetificate).snapshotChanges().pipe(
         finalize(()=>{
          fileRef.getDownloadURL().subscribe((url:any)=>{
          // updating the ceticicate with url
            this.userForm.patchValue({
              farmDetails:{
                farmCIPCCertificate: "dean"
              }
            })
          })

         })
       ).subscribe();
  }
}
