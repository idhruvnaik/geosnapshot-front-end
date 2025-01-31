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

@NgModule({
  declarations: [AppComponent, CustomerComponent, KitchenComponent, CategoryComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [HttpClientModule, AuthenticationGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
