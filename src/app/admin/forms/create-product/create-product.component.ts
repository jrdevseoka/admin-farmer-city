import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm = new FormGroup({
    productDetails: new FormGroup({
      productName: new FormControl(''),
      productDescription: new FormControl(''),
      productCategory: new FormControl(''),
      productQty: new FormControl(''),
      productPrice: new FormControl(''),
      productImage: new FormControl('')
    })
  });
  constructor() { }

  ngOnInit(): void {
  }
  createNewProduct()
  {

  }
}
