// cart.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartToggleSource = new Subject<void>();

  cartToggle$ = this.cartToggleSource.asObservable();

  toggleCart() {
    this.cartToggleSource.next();
  }

  addToCart(item: any) {
    this.cartItems.push(item);
    this.cartToggleSource.next();
  }

  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.cartToggleSource.next();
  }

  getCartItems() {
    return this.cartItems;
  }
}
