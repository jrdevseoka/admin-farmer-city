import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from 'src/app/models/supplier';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productCollection: AngularFirestoreCollection<Product>;

  constructor(
    private firestore: AngularFirestore,
    ) {
      this.productCollection = firestore.collection<Product>('products');
     }

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
  getSuppliers(){
    return this.firestore.collection('Supplies');
  }
    //get  category
  getCategory()
  {
      return this.firestore.collection('categories');
  }
  //getProductByID
  getProductByID(id:string): Observable<Product[]>{
    const productCollection = this.firestore.collection<Product[]>('products');
    return productCollection.snapshotChanges()
    .pipe(
      map(changes=> changes.map(({payload:{doc}})=>{
        const data = doc.data();
        const id = doc.id
        return {id, ...data};
      })),
      map((products: any)=> products.find((doc:any) => doc.id)))
  }
  //Create Product Promo
  createProductPromo(id: any)
  {
    /*Retrieve the product from products collect using product id
    *Create a promotions collection an then add product price * percentageOff
    */
  }

}
