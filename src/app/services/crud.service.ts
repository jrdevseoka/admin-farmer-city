import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Province, Supplier } from '../models/supplier';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  supplier: AngularFirestoreCollection<Supplier>
  constructor(private AfAuth :AngularFireAuth,private firestore :AngularFirestore ) {
    this.supplier = firestore.collection('/Supplies');
   }
   saveSupplierInformation(supplier:any)
   {

    // creating suppler sign In Details
     this.AfAuth.createUserWithEmailAndPassword(supplier.repDetails.emailAddress,supplier.repDetails.password).then(results=>{
      // saving data of supplier with unique id
      this.firestore.collection('Supplies').doc(results.user?.uid).set(supplier)
     }).catch(error=>{
      console.log(error.message)
     })
   }
    updateSupplierInformation(id: string, data: any):Promise<void>{
      return this.supplier.doc(id).update(data)
    }

    //getProvince
    getProvince(){
      return this.firestore.collection('provinces').snapshotChanges();
    }
    getSuppliers()
    {
      return this.firestore.collection('Supplies').snapshotChanges();
    }

}
