import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/models/supplier';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  suppliers: Observable<Supplier[]> | undefined;
  constructor(
    private uServ: UserService,
    private firestore: AngularFirestore
    ) { }

  ngOnInit(): void {
    this.suppliers = this.uServ.getSuppliers();
  }

}
