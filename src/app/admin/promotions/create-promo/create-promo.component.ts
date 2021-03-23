
import { DatePipe } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import 'alpinejs';
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
    const rate = Number(this.formPromotion.get('percentage'));
    this.firestore.collection('product').doc(this.productID).valueChanges().subscribe(results =>{
      this.product = results as Product;
      console.log(this.product.productPrice );
    })

  }
}
