import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, Supplier } from 'src/app/models/supplier';
import { finalize} from "rxjs/operators";
import { CrudService } from 'src/app/services/crud.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  public productForm: FormGroup;
  category :any;
  constructor(
    private crud: CrudService,
    public productCRUD: ProductService,
    private form: FormBuilder,
    private route: Router,
    private storage : AngularFireStorage
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

  supplier: any;
  image : any;
  ngOnInit() {


    // Calling get category products to save them
    this.productCRUD.getCategory().valueChanges().subscribe(result=>{
      this.category = result

    });
    this.productCRUD.getSuppliers().valueChanges().subscribe(results =>{
      this.supplier = results;
    });

  }
  selectedImg(event :any)
  {


    if(event.target.files&& event.target.files[0])
    {
      const reader= new FileReader();



      reader.readAsDataURL(event.target.files[0]);
      this.image = event.target.files[0];

       //this.image=  reader.readAsDataURL(e.target.files[0]);
    }
    else{

      this.image=null

    }


  }
  formStatus: boolean = false;
  createNewProduct(form:any)
  {

    if(this.productForm.valid){

      return;
    }
    // saving image to storage
  var path = `Products/ ${this.image.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(path)
     this.storage.upload(path,this.image).snapshotChanges().pipe(
       finalize(()=>{

        fileRef.getDownloadURL().subscribe((url)=>{
        // updating the productImG with url
        form['productImage']=url;
        //saving product to database
        this.productCRUD.createProduct(form);

        })

       })
     ).subscribe();




   // this.route.navigate(['/products']);

  }
}
