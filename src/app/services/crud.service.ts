import { Product } from './../models/supplier';
import { map } from 'rxjs/operators';
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
  //province: Array<string>
  constructor(private AfAuth :AngularFireAuth,private firestore :AngularFirestore ) {
    this.supplier = firestore.collection('/Supplies');
   }
   saveSupplierInformation(supplier:any)
   {
    // creating suppler sign In Details
     this.AfAuth.createUserWithEmailAndPassword(supplier.repDetails.emailAddress,supplier.repDetails.password).then(results=>{
      // saving data of supplier with unique id
      this.firestore.collection('Supplies').doc(results.user?.uid).set(supplier).then(
        results => {
        }
      )
     }).catch(error=>{
      console.log(error.message)
     })
   }
    updateSupplierInformation(id: string, data: any):Promise<void>{
      return this.supplier.doc(id).update(data)
    }

    //getProvince
    getProvince(){
      return this.firestore.collection('provinces');
    }


    getSuppliers()
    {
      return this.firestore.collection('Supplies').snapshotChanges();
    }
    getProduct(id: string){
      return this.firestore.collection('products').doc(id);
    }
    AutoCancelPromotion(){
      let date: Date = new Date();
      this.firestore.collection<Product>('products').snapshotChanges().pipe(
        map( actions => actions.map(
          e =>{
            const id = e.payload.doc.id;
            const data = e.payload.doc.data() as Product;
            if(data.dateEnded.getTime() > date.getTime()){
              this.firestore.collection<Product>('products').doc(id).delete;
            }
          }
        ))
      )
    }
}
