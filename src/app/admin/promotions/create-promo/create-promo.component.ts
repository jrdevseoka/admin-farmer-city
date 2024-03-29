
import { DatePipe } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import 'alpinejs';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/supplier';
import { CrudService } from 'src/app/services/crud.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-create-promo',
  templateUrl: './create-promo.component.html',
  styleUrls: ['./create-promo.component.css']
})
export class CreatePromoComponent implements OnInit {
formPromotion: FormGroup;
productsCollection: AngularFirestoreCollection<Product>;
 products: Observable<Product[]>;
 product: any;
  constructor(
    private firestore: AngularFirestore,
    private productService: ProductService,
    private crud : CrudService,
    public activated:  ActivatedRoute,
    public form: FormBuilder
    ) {
      this.formPromotion = this.form.group({
        productName: ['', Validators.required],
        percentageOff: ['', Validators.required],
        dateStarted: [, Validators.required],
        dateEnded: [, Validators.required],
    });
    this.productsCollection = firestore.collection<Product>('products');
    this.products = this.productsCollection.valueChanges();
   // this.products = firestore.collection<Product>('products').valueChanges();
    }
    productID: any;
  ngOnInit(){
    //get product ket
     this.productID = this.activated.snapshot.paramMap.get('ref');
     console.log(this.productID);
     this.crud.getProduct(this.productID).valueChanges().subscribe(results =>{
       this.product = results as Product;
     });
    console.log(this.products)
  }
  createPromotion(){
    const rate = Number(this.formPromotion.get('percentageOff')?.value)/100
    let price =  Number(this.product.productPrice);
    let promoPrice: number;

    const promotionPrice = rate * Number(this.product.productPrice);
    promoPrice = price - promotionPrice;
    promoStatus: true;
    let newPrice : any  = {
      'promoPrice' : promoPrice,
      'promoStatus': true,
      'dateStarted': new Date(this.formPromotion.get('dateStarted')?.value).toDateString(),
      'dateEnded': new Date(this.formPromotion.get('dateEnded')?.value).toDateString(),
    }
   // if(this.formPromotion.valid){
      this.firestore.collection('products').doc(this.productID).update(newPrice).then( res => {
        console.log(res)
      }).catch(err => {
        console.log(err.message)
      })
    //}
   // else{
      this.formPromotion.reset()
      alert('not valid')
   // }

  }

  AutoCancelPromotion(){
    let date: Date = new Date();

    const promo: any = {
    'promoPrice': 0,
    'promoStatus': false
    }
    this.firestore.collection<Product>('products').snapshotChanges().pipe(
      map( actions => actions.map(
        e =>{
          const id = e.payload.doc.id;
          const data = e.payload.doc.data() as Product;
          this.product = data;
          if(data.dateEnded.getTime() > date.getTime()){
            this.firestore.collection<Product>('products').doc(id).update(promo);
          }
        }
      ))
    )
  }
}
