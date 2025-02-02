import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthenticationGuard } from './lib/authentication-guard';
import { CategoryComponent } from './app/customer/category/category.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';
import { KitchenComponent } from './components/app/kitchen/kitchen.component';
import { CapitalizePipe } from './capitalize.pipe';

@NgModule({
  declarations: [AppComponent, CustomerComponent, KitchenComponent, CategoryComponent, NavbarComponent, ToastComponent, CapitalizePipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [HttpClientModule, AuthenticationGuard, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
