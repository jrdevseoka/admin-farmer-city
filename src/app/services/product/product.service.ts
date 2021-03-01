import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/supplier';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private firestore: AngularFirestore,
    ) { }

  //Get Products by ID
  getProducts(){
    return this.firestore.collection('products')
  }
  createProduct(product: Product)
  {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('products').add(product).then(
        response => {
          alert('Form was successfully submitted');
          console.log(response)
        },
        error => reject(error)
      )
    });
  }
  deleteProduct(product: any){
    return this.firestore.collection('products').doc(product.id).delete();
  }
  updateProduct(product: Product, id:string)
  {
    return this.firestore.collection('products').doc(id).update({
      productName: product.productName,
      productDescription: product.productDescription,
      productCategory: product.productCategory,
      productQty: product.productQty,
      productPrice: product.productPrice,
      productSupplier: product.productSupplier
    })

  }
  //Get provices



    //get  category
    getCategory()
    {
      return this.firestore.collection('categories');
    }


}
