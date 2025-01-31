import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { AuthenticationGuard } from './lib/authentication-guard';
import { CategoryComponent } from './app/customer/category/category.component';

const routes: Routes = [
  { path: 'customer', component: CustomerComponent },
  {
    path: 'customer/categories',
    component: CategoryComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: 'kitchen', component: KitchenComponent },
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
