import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavigationComponent } from './admin/admin-navigation/admin-navigation.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ViewApplicationComponent } from './admin/dashboard/view-application/view-application.component';
import { CreateSupplierComponent } from './admin/users/create-supplier/create-supplier.component';
import { SuccessComponent } from './admin/forms/success/success.component';
import { EditOrderComponent } from './admin/orders/edit-order/edit-order.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { CreateProductComponent } from './admin/products/create-product/create-product.component';
import { ProductsComponent } from './admin/products/products.component';
import { SupplierComponent } from './admin/supplier/supplier.component';
import { PromotionsComponent } from './admin/promotions/promotions.component';
import { CreatePromoComponent } from './admin/promotions/create-promo/create-promo.component';

const routes: Routes = [
  {path: '', component: CreateProductComponent},
  {path: 'create-supplier', component: CreateSupplierComponent},
  {path: 'create-product', component: CreateProductComponent},
  {path: 'supplier', component:SupplierComponent},
  {path: 'success', component:SuccessComponent},
  {path:'view-application', component: ViewApplicationComponent},
  {path:'products', component: ProductsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'edit-orders',component: EditOrderComponent},
  {path: 'promotions', component:PromotionsComponent},
  {path: 'create-promo', component: CreatePromoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
