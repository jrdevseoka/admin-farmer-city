import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavigationComponent } from './admin/admin-navigation/admin-navigation.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ViewApplicationComponent } from './admin/dashboard/view-application/view-application.component';
import { CreateSupplierComponent } from './admin/forms/create-supplier/create-supplier.component';
import { SuccessComponent } from './admin/forms/success/success.component';
import { CreateProductComponent } from './admin/products/create-product/create-product.component';
import { ProductsComponent } from './admin/products/products.component';
import { SupplierComponent } from './admin/supplier/supplier.component';
import { UsersComponent } from './admin/users/users.component';

const routes: Routes = [
  {path: '', component: CreateProductComponent},
  {path: 'create-supplier', component: CreateSupplierComponent},
  {path: 'create-product', component: CreateProductComponent},
  {path: 'success', component:SuccessComponent},
  {path:'view-application', component: ViewApplicationComponent},
  {path:'products', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
