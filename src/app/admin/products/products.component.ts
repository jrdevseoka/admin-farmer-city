import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Product } from 'src/app/models/supplier';
import { CrudService } from 'src/app/services/crud.service';
import { ProductService } from 'src/app/services/product/product.service';
import { map } from 'rxjs/operators'
import { AngularFirestoreDocument } from '@angular/fire/firestore';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:  any;
  constructor(private productCRUD: ProductService) {
  }
  ngOnInit(){
    this.productCRUD.getProducts().snapshotChanges().subscribe(results=>{
      this.products = results;

    })

  }

}
