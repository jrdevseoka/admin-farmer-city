import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavigationComponent } from './admin/admin-navigation/admin-navigation.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ViewApplicationComponent } from './admin/dashboard/view-application/view-application.component';
import { CreateSupplierComponent } from './admin/forms/create-supplier/create-supplier.component';
import { SuccessComponent } from './admin/forms/success/success.component';
import { SupplierComponent } from './admin/supplier/supplier.component';

const routes: Routes = [
  {path: '', component:DashboardComponent},
  {path: 'create-supplier', component: CreateSupplierComponent},
  {path: 'success', component:SuccessComponent},
  {path:'view-application', component: ViewApplicationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
