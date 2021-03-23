import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {  Order } from './../../models/supplier';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  products: any;
  user : any;
  constructor(protected firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.products = this.firestore.collection<Order>('Orders').snapshotChanges().pipe(
      map(actions => {
        return actions.map(
          e => {
            const id = e.payload.doc.id;
            const data = e.payload.doc.data() as Order;
            this.firestore.collection("Users").doc(data.id).valueChanges().subscribe(res=>{

                this.user= res;
            })
            return { ...data };
          }
        );
      })
    )
  }

}
