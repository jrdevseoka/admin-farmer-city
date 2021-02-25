import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Product } from 'src/app/models/supplier';
import { CrudService } from 'src/app/services/crud.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private crud: CrudService) { }
  products: Product[] = [];
  ngOnInit(): void {
    this.crud.getProducts().subscribe(data =>{
      this.products = data;
    });
  }

}
