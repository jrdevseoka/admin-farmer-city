import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, Supplier } from 'src/app/models/supplier';

import { CrudService } from 'src/app/services/crud.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  public productForm: FormGroup;
  constructor(
    private crud: CrudService,
    private productCRUD: ProductService,
    private form: FormBuilder,
    private route: Router
    ) {
      this.productForm = this.form.group({
        productName: ['', Validators.required],
        productSupplier: ['', Validators.required],
        productDescription: ['', Validators.required],
        productCategory: ['', Validators.required],
        productQty: ['', Validators.required],
        productPrice:['', Validators.required],
        productImage: ['']
    });
     }
   
  productSupplier:  Supplier[] =[];
  
  ngOnInit(): void {
  }
  formStatus: boolean = false; 
  createNewProduct()
  { 
    if(this.productForm.valid){
      return;    
    }
    this.productCRUD.createProduct(this.productForm.value);
   // this.route.navigate(['/products']);
  }
}
