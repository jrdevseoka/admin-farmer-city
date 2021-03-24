import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier } from 'src/app/models/supplier';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  supplierCollection: AngularFirestoreCollection<Supplier>
  suppliers: any;
  constructor(
    public auth: AuthService,
    private uServ: UserService,
    private firestore: AngularFirestore
    ) {
      this.supplierCollection = this.firestore.collection<Supplier>('Supplies');
    }

  ngOnInit(): void {
    this.firestore.collection('Supplies').snapshotChanges().subscribe(
      res => {
        this.suppliers = res.map(
          e=>{
            return{

              ...(e.payload.doc.data() as Supplier),
              id: e.payload.doc.id,
            }
          }
        )
        console.log(this.suppliers)
      }
    )
  }
}
