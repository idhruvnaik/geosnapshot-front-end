import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { AuthenticationGuard } from './lib/authentication-guard';
import { CategoryComponent } from './app/customer/category/category.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [AppComponent, CustomerComponent, KitchenComponent, CategoryComponent, NavbarComponent, ToastComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [HttpClientModule, AuthenticationGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
