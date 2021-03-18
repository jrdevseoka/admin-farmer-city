import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/supplier';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  productCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>
  constructor(public firestore: AngularFirestore) {

    this.productCollection = this.firestore.collection<Product>('products');
    this.products = this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return {...data };
      }))
    );

  }

  ngOnInit(): void {
    this.products;
    this.productCollection;
  }
}
