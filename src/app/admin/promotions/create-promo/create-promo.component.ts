
import { Component, OnInit } from '@angular/core';
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
        dateStarted: ['', Validators.required],
        dateEnded: ['', Validators.required],
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

  createPromotion(){

    this.firestore.collection('products').snapshotChanges().subscribe(
      e => {
        e.map( results =>{
          const productinfo = results.payload.doc.data() as Product;
          console.log(this.product.productPrice);
          const rate = Number(this.formPromotion.get('percentageOff')?.value)/100
          let price =  Number(productinfo.productPrice);

          const promotionPrice = rate * Number(productinfo.productPrice);
          console.log('Promotion rate is '+ rate)
          console.log('Promotion Price is '+ promotionPrice);
          //Calculating new product Price
          price = price - promotionPrice;

          let newPrice : any  = {
            'productPrice' : price
          }


          console.log('New item price ' +price);
          this.firestore.collection('products').doc(this.productID).update(newPrice).then( res => {
            console.log(res)
          }).catch(err => {
            console.log(err.message)
          })

        })
      }
    )
  }
}
