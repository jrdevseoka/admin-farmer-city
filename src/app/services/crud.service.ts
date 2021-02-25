import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Product, Supplier } from '../models/supplier';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private productCollection: AngularFirestoreCollection<Product>;
  shirts: Observable<Product[]>;
  constructor
  (
    private firestore: AngularFirestore,
    private form: FormBuilder
  )
  {
    this.productCollection = firestore.collection('products', ref => ref.orderBy('productName', 'asc'));
    this.shirts = this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a =>{
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    )
  }

  //Product Forms
  productForm = this.form.group({
    productName:  ['', Validators.required],
    productSupplier: ['', Validators.required],
    productDescription: ['', Validators.required],
    productCategory: ['', Validators.required],
    productQty: ['', Validators.required],
    productPrice: ['', Validators.required],
    productImage: ['', Validators.required],
});

}
