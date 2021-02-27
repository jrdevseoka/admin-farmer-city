import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier';
import {}
=======
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
>>>>>>> 1fd8adc502c756388c16c6ce9c2b9d0883e94561
@Injectable({
  providedIn: 'root'
})
export class CrudService {
<<<<<<< HEAD
supplier: AngularFirestoreCollection<Supplier>
  constructor(protected firestore: AngularFirestore) {
    this.supplier = firestore.collection('/Supplier');
  }
   getSupplierInformation():AngularFirestoreCollection<Supplier>{
     return this.supplier;
   }
   saveSupplierInformation(suppliers: Supplier)
   {
     return this.supplier.add({...suppliers});
=======

  constructor(private AfAuth :AngularFireAuth,private Firistore :AngularFirestore ) {
   }
   saveSupplierInformation(supplier:any)
   {

    // creating suppler sign In Details
     this.AfAuth.createUserWithEmailAndPassword(supplier.repDetails.emailAddress,supplier.repDetails.password).then(results=>{

      // saving data of supplier with unique id 
      this.Firistore.collection('Supplies').doc(results.user?.uid).set(supplier)

     }).catch(error=>{

      console.log(error.message)
     })
>>>>>>> 1fd8adc502c756388c16c6ce9c2b9d0883e94561
   }
    updateSupplierInformation(id: string, data: any):Promise<void>{
      return this.supplier.doc(id).update(data)
    }
}
