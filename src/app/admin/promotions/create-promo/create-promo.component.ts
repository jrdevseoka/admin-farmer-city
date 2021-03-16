
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
  today: string | null = new DatePipe("LOCALE_ID").transform(new Date, "yyyy-MM-dd");
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
        dateStarted: [ this.today, Validators.required],
        dateEnded: [this.today, Validators.required],
    });
    this.productsCollection = firestore.collection<Product>('products');
    this.products = this.productsCollection.valueChanges();
    }
    productID: any;
  ngOnInit(){
    //get product ket
     this.productID = this.activated.snapshot.paramMap.get('ref');
     console.log(this.productID);
    this.crud.getProduct(this.productID).valueChanges().subscribe(results =>{
    this.product = results;
    console.log('Promotion id' + this.product);
     });
    // this.products = this.productService.getProducts().snapshotChanges().pipe(
    //   map(actions => actions.map( e => {
    //     const data =  e.payload.doc.data() as Product;
    //     const id = e.payload.doc.id;
    //     return {...data}
    //   }))
    // )

  }
  validateDateLessThan(endDate: string, startDate: string) {
    return (group: FormGroup): {[key: string]: any} =>{
      let f = group.controls[startDate];
      let t = group.controls[endDate];
      if(f.value, t.value){
        return {
          dates: "Date from should not be lesst than Date to"
        }
      }
      return {}
    }
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
      'promoStatus': true
    }
    this.firestore.collection('products').doc(this.productID).update(newPrice).then( res => {
      console.log(res)
    }).catch(err => {
      console.log(err.message)
    })

  }
}
