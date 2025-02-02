import { Component, OnInit } from '@angular/core';
import { CategoryApiService } from './category-api.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { log } from 'console';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  foodItems: any[] = [];
  currentCategory: any = {};
  cartItems: any[] = [];
  orders: any[] = [];

  orderTabs: any = [
    { name: 'Current', value: 'pending' },
    { name: 'Cooking', value: 'inprogress' },
    { name: 'Ready', value: 'ready' },
    { name: 'Canceled', value: 'canceled' },
  ];

  activeTab: string = 'pending';

  isCartOpen = true;
  private cartToggleSubscription: Subscription = new Subscription();

  constructor(
    private categoryApiService: CategoryApiService,
    private router: Router,
    private toastService: ToastService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchTables();

    this.cartToggleSubscription = this.cartService.cartToggle$.subscribe(() => {
      this.toggleCart();
    });

    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  fetchTables(): void {
    this.categoryApiService
      .fetchCategories({ table_token: localStorage.getItem('selectedTable') })
      .subscribe({
        next: (response) => {
          this.categories = response?.data;
        },
        error: (error) => {
          console.error('Error fetching tables:', error);
        },
      });
  }

  fetchFoodItems(category: any): void {
    this.currentCategory = category;
    this.categoryApiService
      .fetchFoodItems({
        category_token: category?.token,
        table_token: localStorage.getItem('selectedTable'),
      })
      .subscribe({
        next: (response) => {
          this.foodItems = response?.data;
        },
        error: (error) => {
          console.error('Error fetching tables:', error);
        },
      });
  }

  listOrders(status: String): void {
    this.categoryApiService
      .listOrders({
        status: status,
        table_token: localStorage.getItem('selectedTable'),
      })
      .subscribe({
        next: (response) => {
          this.orders = response?.data;
        },
        error: (error) => {
          console.error('Error fetching tables:', error);
        },
      });
  }

  resetFoodItems() {
    this.foodItems = [];
    this.currentCategory = null;
  }

  ngOnDestroy() {
    this.cartToggleSubscription.unsubscribe();
  }

  increaseQuantity(item: any) {
    if (!item?.quantity) {
      item.quantity = 0;
    }
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item?.quantity > 0) {
      item.quantity--;
    }
  }

  addToCart(item: any) {
    const itemCopy = { ...item };
    this.cartService.addToCart(itemCopy);

    item.quantity = 0;
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      return;
    }

    this.categoryApiService
      .placeOrder({
        table_token: localStorage.getItem('selectedTable'),
        items: this.cartItems,
      })
      .subscribe({
        next: (response) => {
          this.toggleCart();
          this.toastService.show('Order placed', 'success');
          this.cartService.resetCartItems();
        },
        error: (error) => {
          console.error('Error fetching tables:', error);
        },
      });
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;

    if (this.isCartOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  updateTab(event: Event) {
    this.activeTab = (event.target as HTMLSelectElement).value;
    if (this.activeTab != 'pending') {
      this.listOrders(this.activeTab);
    }
  }
}
