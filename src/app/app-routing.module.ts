import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { KitchenComponent } from './kitchen/kitchen.component';

const routes: Routes = [
  { path: 'customer', component: CustomerComponent },
  { path: 'kitchen', component: KitchenComponent },
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
