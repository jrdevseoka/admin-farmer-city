import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier';
import {}
@Injectable({
  providedIn: 'root'
})
export class CrudService {
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
   }
    updateSupplierInformation(id: string, data: any):Promise<void>{
      return this.supplier.doc(id).update(data)
    }
}
