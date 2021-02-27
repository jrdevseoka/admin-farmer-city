import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

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
   }
}
