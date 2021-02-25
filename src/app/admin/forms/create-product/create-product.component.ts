import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/supplier';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  
  productCategory = [
    "Fruits",
    "Vegetable",
    "Meat",
    "Diary"
  ]
  productSupplier = [
    {
    }
  ]
  product: Product = {
    productName: '',
    productCategory: '',
    productDescription: '',
    productPrice: '',
    productQty: '',
    productImage: ''
  }
  constructor(public crud: CrudService) { }

  ngOnInit(): void {
  }
  
  createNewProduct()
  {
    this.crud.createProduct(this.product);    
  }
}
