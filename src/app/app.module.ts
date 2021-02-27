import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Importing font awesome icons
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTachometerAlt as fasTachometerAlt, faCarrot as fasCarrot, faReceipt as fasReceipt, faTruck as fasTruck} from "@fortawesome/free-solid-svg-icons";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";


import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductsComponent } from './admin/products/products.component';
import { SupplierComponent } from './admin/supplier/supplier.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudService } from './services/crud.service';
import { CreateUserComponent } from './admin/forms/create-user/create-user.component';
import { CreateSupplierComponent } from './admin/forms/create-supplier/create-supplier.component';
import { SuccessComponent } from './admin/forms/success/success.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AdminNavigationComponent } from './admin/admin-navigation/admin-navigation.component';
import { ViewApplicationComponent } from './admin/dashboard/view-application/view-application.component';
import { EditProductComponent } from './admin/products/edit-product/edit-product.component';
import { CreateProductComponent } from './admin/forms/create-product/create-product.component';
import { CreatePromotionsComponent } from './admin/forms/create-promotions/create-promotions.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './admin/users/users.component';
=======
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth'
import { environment } from 'src/environments/environment';

>>>>>>> 1fd8adc502c756388c16c6ce9c2b9d0883e94561

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore} from '@angular/fire/firestore'
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    SupplierComponent,
    CreateSupplierComponent,
    CreateUserComponent,
    SuccessComponent,
    NavigationComponent,
    AdminNavigationComponent,
    ViewApplicationComponent,
    EditProductComponent,
    CreateProductComponent,
    CreatePromotionsComponent,
    LoginComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestore
=======
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
>>>>>>> 1fd8adc502c756388c16c6ce9c2b9d0883e94561
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary){
    library.addIcons(fasTachometerAlt, fasCarrot,
       fasReceipt, fasTruck);
  }
 }
