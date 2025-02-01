import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartToggleSource = new BehaviorSubject<boolean>(false);
  cartToggle$ = this.cartToggleSource.asObservable();

  toggleCart() {
    this.cartToggleSource.next(!this.cartToggleSource.getValue());
  }

  addToCart(item: any) {
    let currentItems = this.cartItemsSubject.getValue();
    let existingItem = currentItems.find((object) => object?.food_token === item?.food_token);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ ...item, quantity: 1 });
    }

    this.cartItemsSubject.next([...currentItems]);
    this.toggleCart();
  }

  removeFromCart(item: any) {
    let currentItems = this.cartItemsSubject.getValue();
    const index = currentItems.findIndex((i) => i.id === item.id);

    if (index > -1) {
      currentItems.splice(index, 1);
    }

    this.cartItemsSubject.next([...currentItems]);
  }

  getCartItems(): Observable<any[]> {
    return this.cartItems$;
  }

  resetCartItems() {
    this.cartItemsSubject.next([]);
  }
}
