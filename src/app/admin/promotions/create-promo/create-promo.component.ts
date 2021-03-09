import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'alpinejs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/supplier';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-create-promo',
  templateUrl: './create-promo.component.html',
  styleUrls: ['./create-promo.component.css']
})
export class CreatePromoComponent implements OnInit {
  productCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  constructor(
    private firestore: AngularFirestore,
    private productService: ProductService
    ) {
      this.productCollection = firestore.collection<Product>('products');
      this.products = this.productCollection.snapshotChanges().pipe(map(results => results.map(
        e=> {
          const data = e.payload.doc.data() as Product
          const id = e.payload.doc.id;
          return {...data};
        }
      )))
    }

  ngOnInit(): void {
    this.products = this.productCollection.snapshotChanges().pipe(map(results => results.map(
      e=> {
        const data = e.payload.doc.data() as Product
        const id = e.payload.doc.id;
        return {...data};
      }
    )))
  }
}
